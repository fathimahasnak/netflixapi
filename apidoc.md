// page 1

List of genre
(Get) http://localhost:11011/genre
      https://demonetflixapi.herokuapp.com/genre
List of shows
(Get) http://localhost:11011/showType
      https://demonetflixapi.herokuapp.com/showType
Shows on the basis of genre
(Get) http://localhost:11011/listItem?genreId=104
      https://demonetflixapi.herokuapp.com/listItem?genreId=104
List of QuickSearch 
(Get) http://localhost:11011/listItem
      https://demonetflixapi.herokuapp.com/listItem

//Page2

List of show types available on basis of genre
(Get) http://localhost:11011/itemData?genreId=107
      https://demonetflixapi.herokuapp.com/itemData?genreId=107
List on the basis of subtitles available
(Get) http://localhost:11011/data?subtitleId=105
      https://demonetflixapi.herokuapp.com/data?subtitleId=105
List on the basis of dub available
(Get) http://localhost:11011/data?dubId=4
      http://localhost:11011/data?subtitleId=100&dubId=4
Filter on the basis of subtitles available
(Get) http://localhost:11011/filter/100
      https://demonetflixapi.herokuapp.com/filter/100
Filter on the basis of subtitles and dub available
(Get) http://localhost:11011/filter/100?dubId=4
      https://demonetflixapi.herokuapp.com/filter/100?dubId=4
Filter on basis of rating
(Get) http://localhost:11011/filter/100?lowlimit=3&highlimit=7
      https://demonetflixapi.herokuapp.com/filter/100?lowlimit=3&highlimit=7
Sort on basis of rating
(Get) http://localhost:11011/filter/100?lowlimit=3&highlimit=7&sort=-1
      https://demonetflixapi.herokuapp.com/filter/100?lowlimit=3&highlimit=7&sort=-1

//Page3

Details of the selected show
(Get) http://localhost:11011/details/2001
      https://demonetflixapi.herokuapp.com/details/2001
