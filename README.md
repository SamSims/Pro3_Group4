# Gang of 00100
Project Team 4: Election Results Analysis

# Project Brief
Election results are driven by the electoral college every four years, but what if they weren’t? What if they were driven by district votes instead? Group 4 aims to visualize how the outcomes of our elections may have changed, should winning candidates be determined on the district vote instead of the electoral college.
The Gang of 00100 will visualize the United States map broken down by congressional districts, each of which show voting results, per party, for the 2012, 2016, and 2020 elections. From there, the team expects to highlight the difference between the actual election results in a defined year, vs whether the outcome would be different if district votes won all.

# Instructions to RUN
Run notebooks (.ipynb) and open htmls:
index.html SlideMap.html Historical_Presidential_Results.html
The html will not run on Git because the GeoJSONs were too large to add to Git.

# New Libraries Used
1. 'us' library allowed us to pull info about US states.
2. 'geopandas' allows you to convert from .shp (shape files) to GeoJSON files.
3. 'rdata', 'pyreadr' allows you to convert R files to python.
4. 'geojson' was used to edit geojson – used in a different capacity as we’ve done in class.
   
# Sourced Data
	1. Election Data: Harvard Dataverse ( https://dataverse.harvard.edu/file.xhtml?fileId=5028532&version=1.1)
	2. Census Data: [data uploaded to OneDrive: Project 3]
 
# Data Analysis
	1. Narrowed scope to elections post 1952 since the quality of the vote data, by district (including county split), isn’t as limited.
	2. Scope of years was further narrowed when it was found that Census county boundaries were publicly provided from 2007-2023. To coincide with elections, we determined to focus on 2008, 2012, 2016, and 2020 data.
	3. Our scope of data was narrowed a 3rd time after looking at the data and realizing the most complete and quality data across the board would be for the years 2012, 2016, and 2020.
 
# Project Ethics
	1. Ethical Considerations:
   
   Privacy: No identifiable data was used so no privacy issues. 
   
   Approach: How to use the data in an accurate and meaningful way. 
   
   Options: We considered the other extreme of looking at the data from a National Popular Vote POV (readily available); we opted to look at the district level (higher level of complexity and detail).
   
	2. Ethical Conversations: 
   2016 Election – PA data missing from one of the biggest contested states from 2016 election 
   
   2020 Election – The power of realizing 'it’s all how you look at that data.' Had the 2020 election used proportional district totals instead of the Electoral college, the Republicans would have prevailed based on the data we have, though knowing there are limitations and gaps in the data.
   
   	3. Ethical Decisions:
    
    Data Methodology Approach - Our team split Dem and Rep votes based on district lines and proportion of voters in each, so data may be flawed. We unfortunately did not have access to election results by county to have a higher level of accuracy. We essentially took the Total County Population, Split the votes based on the % of population in each district from each county.

# User Driven Interactions:
	1. Clickable Table of Contents
	2. Year drop down
	3. Clickable map
	4. Data pop ups 
 
# Webpages to Include
	1. Page 1: Homepage – project brief + URLs to various views
	2. Page 2: Chart of Election Result dating back to 1856
	3. Page 3: Slider and Map View
 
# Alternate Considerations:
	1. Dave’s DRA Git files [2010 & 2020 election (Harvard data) and Census Data] -  https://github.com/dra2020/vtd_data/tree/master
	2. Census Data: GeoID mapping to County
	3. Presidential Precinct Map 2020 -  https://github.com/TheUpshot/presidential-precinct-map-2020
	4. GeoJSON Coordinates for the district maps:
		a. GeoJSON files across US -  https://data-usdot.opendata.arcgis.com/datasets/usdot::congressional-districts/explore?location=0.131172%2C0.314298%2C1.77&showTable=true
		b. Dave's DRA coordinates/web interface -  https://medium.com/dra-2020/official-maps-90f43c695b4
		c. Census TIGER/Line Shapefiles – most accurate and complete for years needed  https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line- f ile.2024.html#list-tab-790442341  https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2024.html#list-tab-790442341

