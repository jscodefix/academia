#!/usr/bin/env ruby
# outputs attributes of all countries using wikidata
# https://www.wikidata.org/wiki/Wikidata:SPARQL_query_service/queries/examples/ko # see Geography example

# prerequisite: gem install sparql
#   http://www.rubydoc.info/github/ruby-rdf/sparql/frames
# ideas:
# - add continent, area (kilometers squared)
# - add image of flag, image of country shape

require 'sparql/client'
require 'json'

endpoint = "https://query.wikidata.org/sparql"
sparql = <<'SPARQL'.chop
# list of present-day countries and capital(s)
# added before 2016-10
SELECT DISTINCT ?country ?countryLabel ?capital ?capitalLabel ?continent ?continentLabel ?area
WHERE
{
  ?country wdt:P31 wd:Q3624078 .
  # not a former country
  FILTER NOT EXISTS {?country wdt:P31 wd:Q3024240}
  # and not an ancient civilization (exclude ancient Egypt)
  FILTER NOT EXISTS {?country wdt:P31 wd:Q28171280}

  OPTIONAL { ?country wdt:P36 ?capital } .
  OPTIONAL { ?country wdt:P30 ?continent } .
  OPTIONAL { ?country wdt:P2046 ?area } .    # country geometric area

  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],mul,en" }
}
ORDER BY ?countryLabel
SPARQL

client = SPARQL::Client.new(
  endpoint,
  :method => :get,
  # adjust user agent; see https://w.wiki/CX6
  headers: {
    'User-Agent' => 'jscodefix-ruby/0.1 (https://github.com/jscodefix/; jscodefix@sheffel.org)',
    'Accept' => 'application/sparql-results+json'
  }
)

data = client.query(sparql)
# puts JSON.pretty_generate(data.to_h)  # wrong; to_h wrong element type RDF::Query::Solution

# Convert each solution to a hash and collect them into an array
results_as_hashes = data.map do |solution|
  solution.to_h.transform_values(&:to_s) # Convert each value (RDF::Resource, RDF::Literal) to its string representation
end

# You might want to wrap this in a top-level hash for cleaner JSON
# especially if you want to include metadata or follow the SPARQL JSON results format more closely
json_output_data = {
  "head" => {
    "vars" => %w[country countryLabel capital capitalLabel continent continentLabel area]

  },
  "results" => {
    "bindings" => results_as_hashes
  }
}

# Convert the structured data to a JSON string and print it
puts JSON.pretty_generate(json_output_data)

