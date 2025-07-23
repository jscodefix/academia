* Readme for wdq-countries.rb

A Ruby script that queries Wikidata for all countries and some country attibutes, returning JSON data.


* Failed Attempts to Obtain the Units of (Geometric) Area

I made a handful of attempts to have Google Gemini find a solution to adding the country's geometric area to the query.

** Obtain the Raw Area

Fails and returns no data for areaUnit and areaUnitLabel.

SELECT DISTINCT ?country ?countryLabel ?capital ?capitalLabel ?continent ?continentLabel ?area ?areaUnit ?areaUnitLabel
WHERE
...
  # 1. Get the area value directly (this works for you)
  OPTIONAL { ?country wdt:P2046 ?area_value_raw . }
  BIND(COALESCE(?area_value_raw, "") AS ?area) # Ensure ?area is always bound, even if empty

  # 2. Separately, try to get the unit's QID using the statement pattern
  OPTIONAL {
    ?country p:P2046 ?areaStatement . # Get the statement node for P2046
    # Note: We are NOT re-binding ?area here to avoid conflict/failure with step 1
    ?areaStatement wikibase:quantityUnit ?areaUnit_raw . # Get the unit QID
  }
  BIND(COALESCE(?areaUnit_raw, "") AS ?areaUnit) # Ensure ?areaUnit is always bound, even if empty

  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "[AUTO_LANGUAGE],mul,en" .
    # This service should now label ?areaUnit if it's bound, along with other items.
  }


** Use a Subquery

Fails and returns no data for areaUnit and areaUnitLabel.

SELECT DISTINCT ?country ?countryLabel ?capital ?capitalLabel ?continent ?continentLabel ?area ?areaUnit ?areaUnitLabel
WHERE
...
  # Use a subquery to get the area value and its unit QID
  # This isolates the potentially problematic pattern
  OPTIONAL {
    SELECT ?country ?area_sub ?areaUnit_sub
    WHERE {
      ?country wdt:P2046 ?area_sub . # Get the area value (this part works for you)
      OPTIONAL {
        ?country p:P2046 ?areaStatement_sub .
        # Ensure the areaStatement matches the ?area_sub value if there are multiple.
        # This is important if wdt:P2046 gives a raw value and p:/ps: could be ambiguous.
        ?areaStatement_sub ps:P2046 ?area_sub . # Re-match the same area value from the statement
        ?areaStatement_sub wikibase:quantityUnit ?areaUnit_sub . # Get the unit QID
      }
    }
  }

  # Bind the results from the subquery to the main query variables
  # Use COALESCE to ensure variables are always bound, even if the subquery returns no area/unit for a country
  BIND(COALESCE(?area_sub, "") AS ?area)
  BIND(COALESCE(?areaUnit_sub, "") AS ?areaUnit)

  SERVICE wikibase:label {
    bd:serviceParam wikibase:language "[AUTO_LANGUAGE],mul,en" .
    # This service should now reliably label ?areaUnit if it's bound, along with other items.
  }


