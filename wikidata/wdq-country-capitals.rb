#!/usr/bin/env ruby

# prerequisite: gem install sparql
#   http://www.rubydoc.info/github/ruby-rdf/sparql/frames

require 'sparql/client'

endpoint = "https://query.wikidata.org/sparql"
sparql = <<'SPARQL'.chop
# list of present-day countries and capital(s)
# added before 2016-10
SELECT DISTINCT ?country ?countryLabel ?capital ?capitalLabel
WHERE
{
  ?country wdt:P31 wd:Q3624078 .
  # not a former country
  FILTER NOT EXISTS {?country wdt:P31 wd:Q3024240}
  # and no an ancient civilisation (needed to exclude ancient Egypt)
  FILTER NOT EXISTS {?country wdt:P31 wd:Q28171280}
  OPTIONAL { ?country wdt:P36 ?capital } .

  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
}
ORDER BY ?countryLabel
SPARQL

client = SPARQL::Client.new(
  endpoint,
  :method => :get,
  # adjust user agent; see https://w.wiki/CX6
  headers: {
    'User-Agent' => 'jscodefix-ruby/0.1 (https://github.com/jscodefix/; jscodefix@sheffel.org)'
  }
)

rows = client.query(sparql)

puts "Number of rows: #{rows.size}"
for row in rows
  for key,val in row do
    # print "#{key.to_s.ljust(10)}: #{val}\t"
    print "#{key}: #{val}\t"
  end
  print "\n"
end

