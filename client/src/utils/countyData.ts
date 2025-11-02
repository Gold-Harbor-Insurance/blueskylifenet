const countyData: Record<string, string[]> = {
  "Alabama": [
    "Jefferson County", "Mobile County", "Madison County", "Montgomery County", "Shelby County",
    "Baldwin County", "Tuscaloosa County", "Lee County", "Morgan County", "Calhoun County",
    "Houston County", "Etowah County", "Lauderdale County", "St. Clair County", "Limestone County"
  ],
  "Alaska": [
    "Anchorage Municipality", "Matanuska-Susitna Borough", "Fairbanks North Star Borough", "Kenai Peninsula Borough",
    "Juneau City and Borough", "Bethel Census Area", "Nome Census Area", "North Slope Borough", "Southeast Fairbanks Census Area"
  ],
  "Arizona": [
    "Maricopa County", "Pima County", "Pinal County", "Yavapai County", "Mohave County",
    "Coconino County", "Yuma County", "Cochise County", "Navajo County", "Apache County",
    "Gila County", "Graham County", "La Paz County", "Santa Cruz County", "Greenlee County"
  ],
  "Arkansas": [
    "Pulaski County", "Benton County", "Washington County", "Sebastian County", "Faulkner County",
    "Craighead County", "Garland County", "Saline County", "Lonoke County", "White County",
    "Jefferson County", "Crittenden County", "Pope County", "Crawford County", "Mississippi County"
  ],
  "California": [
    "Los Angeles County", "San Diego County", "Orange County", "Riverside County", "San Bernardino County",
    "Santa Clara County", "Alameda County", "Sacramento County", "Contra Costa County", "Fresno County",
    "Kern County", "San Francisco County", "Ventura County", "San Mateo County", "San Joaquin County",
    "Stanislaus County", "Sonoma County", "Tulare County", "Santa Barbara County", "Solano County",
    "Monterey County", "Placer County", "San Luis Obispo County", "Santa Cruz County", "Merced County",
    "Marin County", "Butte County", "Yolo County", "El Dorado County", "Imperial County"
  ],
  "Colorado": [
    "Denver County", "El Paso County", "Arapahoe County", "Jefferson County", "Adams County",
    "Larimer County", "Douglas County", "Boulder County", "Weld County", "Pueblo County",
    "Mesa County", "Garfield County", "Eagle County", "La Plata County", "Broomfield County"
  ],
  "Connecticut": [
    "Fairfield County", "Hartford County", "New Haven County", "New London County", "Litchfield County",
    "Middlesex County", "Tolland County", "Windham County"
  ],
  "Delaware": [
    "New Castle County", "Sussex County", "Kent County"
  ],
  "District of Columbia": [
    "District of Columbia"
  ],
  "Florida": [
    "Miami-Dade County", "Broward County", "Palm Beach County", "Hillsborough County", "Orange County",
    "Pinellas County", "Duval County", "Lee County", "Polk County", "Brevard County",
    "Volusia County", "Pasco County", "Seminole County", "Sarasota County", "Manatee County",
    "Collier County", "Escambia County", "Lake County", "Leon County", "St. Lucie County",
    "Marion County", "Osceola County", "Alachua County", "Charlotte County", "Bay County"
  ],
  "Georgia": [
    "Fulton County", "Gwinnett County", "Cobb County", "DeKalb County", "Clayton County",
    "Chatham County", "Cherokee County", "Forsyth County", "Henry County", "Richmond County",
    "Muscogee County", "Bibb County", "Hall County", "Houston County", "Columbia County",
    "Paulding County", "Coweta County", "Fayette County", "Bartow County", "Lowndes County"
  ],
  "Hawaii": [
    "Honolulu County", "Hawaii County", "Maui County", "Kauai County", "Kalawao County"
  ],
  "Idaho": [
    "Ada County", "Canyon County", "Kootenai County", "Bonneville County", "Twin Falls County",
    "Bannock County", "Nez Perce County", "Madison County", "Bingham County", "Latah County"
  ],
  "Illinois": [
    "Cook County", "DuPage County", "Lake County", "Will County", "Kane County",
    "McHenry County", "Winnebago County", "Madison County", "St. Clair County", "Champaign County",
    "Sangamon County", "Peoria County", "Tazewell County", "Rock Island County", "McLean County",
    "Kendall County", "LaSalle County", "Kankakee County", "Macon County", "DeKalb County"
  ],
  "Indiana": [
    "Marion County", "Lake County", "Allen County", "Hamilton County", "St. Joseph County",
    "Elkhart County", "Vanderburgh County", "Tippecanoe County", "Hendricks County", "Porter County",
    "Johnson County", "Madison County", "Delaware County", "Vigo County", "Clark County",
    "Monroe County", "LaPorte County", "Hancock County", "Floyd County", "Howard County"
  ],
  "Iowa": [
    "Polk County", "Linn County", "Scott County", "Johnson County", "Black Hawk County",
    "Woodbury County", "Dubuque County", "Story County", "Dallas County", "Pottawattamie County",
    "Warren County", "Clinton County", "Cerro Gordo County", "Muscatine County", "Marshall County"
  ],
  "Kansas": [
    "Johnson County", "Sedgwick County", "Shawnee County", "Wyandotte County", "Douglas County",
    "Leavenworth County", "Riley County", "Reno County", "Butler County", "Saline County",
    "Crawford County", "Finney County", "Ford County", "Lyon County", "McPherson County"
  ],
  "Kentucky": [
    "Jefferson County", "Fayette County", "Kenton County", "Boone County", "Hardin County",
    "Warren County", "Daviess County", "Campbell County", "Madison County", "Bullitt County",
    "McCracken County", "Christian County", "Laurel County", "Oldham County", "Jessamine County"
  ],
  "Louisiana": [
    "East Baton Rouge Parish", "Jefferson Parish", "Orleans Parish", "St. Tammany Parish", "Lafayette Parish",
    "Caddo Parish", "Calcasieu Parish", "Livingston Parish", "Tangipahoa Parish", "Rapides Parish",
    "Bossier Parish", "Terrebonne Parish", "Ouachita Parish", "Lafourche Parish", "Ascension Parish",
    "St. Landry Parish", "Iberia Parish", "Acadia Parish", "St. Martin Parish", "St. Bernard Parish"
  ],
  "Maine": [
    "Cumberland County", "York County", "Penobscot County", "Kennebec County", "Androscoggin County",
    "Aroostook County", "Oxford County", "Hancock County", "Knox County", "Waldo County",
    "Somerset County", "Washington County", "Sagadahoc County", "Franklin County", "Lincoln County", "Piscataquis County"
  ],
  "Maryland": [
    "Montgomery County", "Prince George's County", "Baltimore County", "Anne Arundel County", "Howard County",
    "Baltimore City", "Harford County", "Frederick County", "Carroll County", "Charles County",
    "St. Mary's County", "Washington County", "Wicomico County", "Allegany County", "Cecil County"
  ],
  "Massachusetts": [
    "Middlesex County", "Worcester County", "Essex County", "Suffolk County", "Norfolk County",
    "Bristol County", "Plymouth County", "Hampden County", "Barnstable County", "Hampshire County",
    "Berkshire County", "Franklin County", "Dukes County", "Nantucket County"
  ],
  "Michigan": [
    "Wayne County", "Oakland County", "Macomb County", "Kent County", "Genesee County",
    "Washtenaw County", "Ottawa County", "Ingham County", "Kalamazoo County", "Livingston County",
    "St. Clair County", "Saginaw County", "Muskegon County", "Monroe County", "Berrien County",
    "Jackson County", "Allegan County", "Bay County", "Calhoun County", "Eaton County"
  ],
  "Minnesota": [
    "Hennepin County", "Ramsey County", "Dakota County", "Anoka County", "Washington County",
    "St. Louis County", "Olmsted County", "Scott County", "Stearns County", "Wright County",
    "Carver County", "Blue Earth County", "Sherburne County", "Clay County", "Rice County"
  ],
  "Mississippi": [
    "Hinds County", "Harrison County", "DeSoto County", "Rankin County", "Jackson County",
    "Madison County", "Lauderdale County", "Lee County", "Forrest County", "Jones County",
    "Lowndes County", "Washington County", "Lafayette County", "Pike County", "Hancock County"
  ],
  "Missouri": [
    "St. Louis County", "Jackson County", "St. Charles County", "Jefferson County", "Greene County",
    "Clay County", "Boone County", "Cass County", "St. Louis City", "Franklin County",
    "Christian County", "Cape Girardeau County", "Platte County", "Jasper County", "Buchanan County",
    "Cole County", "Taney County", "Pulaski County", "St. Francois County", "Pettis County"
  ],
  "Montana": [
    "Yellowstone County", "Missoula County", "Gallatin County", "Flathead County", "Cascade County",
    "Lewis and Clark County", "Ravalli County", "Silver Bow County", "Lake County", "Park County"
  ],
  "Nebraska": [
    "Douglas County", "Lancaster County", "Sarpy County", "Hall County", "Buffalo County",
    "Dakota County", "Dodge County", "Madison County", "Platte County", "Scotts Bluff County",
    "Lincoln County", "Gage County", "Cass County", "Adams County", "Saunders County"
  ],
  "Nevada": [
    "Clark County", "Washoe County", "Carson City", "Lyon County", "Elko County",
    "Nye County", "Douglas County", "Churchill County", "Humboldt County", "White Pine County"
  ],
  "New Hampshire": [
    "Hillsborough County", "Rockingham County", "Merrimack County", "Grafton County", "Strafford County",
    "Cheshire County", "Carroll County", "Belknap County", "Sullivan County", "Coos County"
  ],
  "New Jersey": [
    "Bergen County", "Essex County", "Middlesex County", "Hudson County", "Monmouth County",
    "Ocean County", "Union County", "Camden County", "Passaic County", "Morris County",
    "Burlington County", "Somerset County", "Mercer County", "Gloucester County", "Atlantic County",
    "Cumberland County", "Sussex County", "Warren County", "Hunterdon County", "Cape May County", "Salem County"
  ],
  "New Mexico": [
    "Bernalillo County", "Dona Ana County", "Santa Fe County", "San Juan County", "Sandoval County",
    "Lea County", "Valencia County", "Otero County", "Eddy County", "Chaves County",
    "McKinley County", "Rio Arriba County", "Curry County", "San Miguel County", "Grant County"
  ],
  "New York": [
    "Kings County", "Queens County", "New York County", "Suffolk County", "Bronx County",
    "Nassau County", "Westchester County", "Erie County", "Richmond County", "Monroe County",
    "Onondaga County", "Orange County", "Rockland County", "Albany County", "Dutchess County",
    "Saratoga County", "Niagara County", "Oneida County", "Broome County", "Ulster County",
    "Rensselaer County", "Chautauqua County", "Oswego County", "Jefferson County", "St. Lawrence County"
  ],
  "North Carolina": [
    "Mecklenburg County", "Wake County", "Guilford County", "Forsyth County", "Cumberland County",
    "Durham County", "Buncombe County", "Union County", "Gaston County", "New Hanover County",
    "Cabarrus County", "Onslow County", "Johnston County", "Orange County", "Rowan County",
    "Alamance County", "Davidson County", "Iredell County", "Pitt County", "Brunswick County"
  ],
  "North Dakota": [
    "Cass County", "Burleigh County", "Grand Forks County", "Ward County", "Morton County",
    "Stark County", "Williams County", "Stutsman County", "Richland County", "Barnes County"
  ],
  "Ohio": [
    "Cuyahoga County", "Franklin County", "Hamilton County", "Summit County", "Montgomery County",
    "Lucas County", "Butler County", "Stark County", "Lorain County", "Clermont County",
    "Warren County", "Mahoning County", "Lake County", "Delaware County", "Medina County",
    "Licking County", "Greene County", "Trumbull County", "Portage County", "Fairfield County"
  ],
  "Oklahoma": [
    "Oklahoma County", "Tulsa County", "Cleveland County", "Canadian County", "Comanche County",
    "Rogers County", "Wagoner County", "Creek County", "Pottawatomie County", "Muskogee County",
    "Payne County", "Washington County", "Garfield County", "Carter County", "Osage County"
  ],
  "Oregon": [
    "Multnomah County", "Washington County", "Clackamas County", "Lane County", "Marion County",
    "Jackson County", "Deschutes County", "Linn County", "Douglas County", "Yamhill County",
    "Benton County", "Josephine County", "Polk County", "Umatilla County", "Columbia County"
  ],
  "Pennsylvania": [
    "Philadelphia County", "Allegheny County", "Montgomery County", "Bucks County", "Delaware County",
    "Lancaster County", "Chester County", "York County", "Berks County", "Lehigh County",
    "Westmoreland County", "Northampton County", "Luzerne County", "Dauphin County", "Erie County",
    "Cumberland County", "Washington County", "Butler County", "Lackawanna County", "Beaver County"
  ],
  "Puerto Rico": [
    "San Juan", "Bayamón", "Carolina", "Ponce", "Caguas", "Guaynabo", "Mayagüez", "Trujillo Alto",
    "Arecibo", "Fajardo", "Aguadilla", "Cayey", "Humacao", "Toa Baja", "Yauco", "Coamo",
    "Guayama", "Isabela", "Manatí", "Vega Baja", "San Germán", "Utuado", "Cabo Rojo", "Añasco",
    "Rincón", "Dorado", "Gurabo", "Juncos", "Las Piedras", "Moca"
  ],
  "Rhode Island": [
    "Providence County", "Kent County", "Washington County", "Newport County", "Bristol County"
  ],
  "South Carolina": [
    "Greenville County", "Richland County", "Charleston County", "Horry County", "Spartanburg County",
    "Lexington County", "York County", "Anderson County", "Beaufort County", "Berkeley County",
    "Aiken County", "Florence County", "Sumter County", "Orangeburg County", "Pickens County"
  ],
  "South Dakota": [
    "Minnehaha County", "Pennington County", "Lincoln County", "Brown County", "Brookings County",
    "Codington County", "Lawrence County", "Davison County", "Meade County", "Yankton County"
  ],
  "Tennessee": [
    "Shelby County", "Davidson County", "Knox County", "Hamilton County", "Rutherford County",
    "Williamson County", "Sumner County", "Montgomery County", "Wilson County", "Blount County",
    "Washington County", "Sullivan County", "Maury County", "Sevier County", "Bradley County"
  ],
  "Texas": [
    "Harris County", "Dallas County", "Tarrant County", "Bexar County", "Travis County",
    "Collin County", "Denton County", "El Paso County", "Fort Bend County", "Hidalgo County",
    "Montgomery County", "Williamson County", "Cameron County", "Nueces County", "Brazoria County",
    "Bell County", "Galveston County", "Lubbock County", "Webb County", "Jefferson County",
    "McLennan County", "Guadalupe County", "Smith County", "Ector County", "Ellis County",
    "Hays County", "Midland County", "Taylor County", "Brazos County", "Potter County"
  ],
  "Utah": [
    "Salt Lake County", "Utah County", "Davis County", "Weber County", "Washington County",
    "Cache County", "Tooele County", "Summit County", "Iron County", "Box Elder County",
    "Sanpete County", "Carbon County", "Uintah County", "Sevier County", "Wasatch County"
  ],
  "Vermont": [
    "Chittenden County", "Rutland County", "Washington County", "Windsor County", "Bennington County",
    "Franklin County", "Windham County", "Orange County", "Addison County", "Lamoille County",
    "Orleans County", "Caledonia County", "Essex County", "Grand Isle County"
  ],
  "Virginia": [
    "Fairfax County", "Prince William County", "Virginia Beach City", "Loudoun County", "Henrico County",
    "Chesterfield County", "Chesapeake City", "Norfolk City", "Arlington County", "Richmond City",
    "Newport News City", "Alexandria City", "Hampton City", "Roanoke County", "Stafford County",
    "Spotsylvania County", "Portsmouth City", "Suffolk City", "Albemarle County", "Fauquier County"
  ],
  "Washington": [
    "King County", "Pierce County", "Snohomish County", "Spokane County", "Clark County",
    "Thurston County", "Kitsap County", "Yakima County", "Whatcom County", "Benton County",
    "Cowlitz County", "Grant County", "Franklin County", "Skagit County", "Grays Harbor County"
  ],
  "West Virginia": [
    "Kanawha County", "Berkeley County", "Cabell County", "Wood County", "Monongalia County",
    "Raleigh County", "Harrison County", "Putnam County", "Marion County", "Jefferson County",
    "Mercer County", "Wayne County", "Ohio County", "Fayette County", "Mineral County"
  ],
  "Wisconsin": [
    "Milwaukee County", "Dane County", "Waukesha County", "Brown County", "Racine County",
    "Outagamie County", "Kenosha County", "Rock County", "Winnebago County", "Washington County",
    "Marathon County", "Eau Claire County", "La Crosse County", "Sheboygan County", "Dodge County",
    "St. Croix County", "Ozaukee County", "Fond du Lac County", "Walworth County", "Jefferson County"
  ],
  "Wyoming": [
    "Laramie County", "Natrona County", "Campbell County", "Sweetwater County", "Fremont County",
    "Albany County", "Sheridan County", "Park County", "Uinta County", "Carbon County",
    "Goshen County", "Teton County", "Lincoln County", "Big Horn County", "Converse County"
  ]
};

export function getCountiesByState(state: string): string[] {
  const normalizedState = state.trim();
  
  const exactMatch = countyData[normalizedState];
  if (exactMatch) {
    return exactMatch;
  }
  
  const lowerCaseInput = normalizedState.toLowerCase();
  for (const [stateName, counties] of Object.entries(countyData)) {
    if (stateName.toLowerCase() === lowerCaseInput) {
      return counties;
    }
  }
  
  return [];
}
