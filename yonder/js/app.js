Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAJsk5gQoURIkO5a2LirOeHolg-wcIEV0I',
        libraries: 'geometry',
    }
});

VueScrollTo.setDefaults({
    container: "#scroller",
    duration: 500,
    easing: "ease",
    offset: -10,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
})

document.addEventListener('DOMContentLoaded', function() {

    Vue.component('google-map', VueGoogleMaps.Map);

    var vm = new Vue({
        el: '#app',
        data: {
            name: 'Six weeks in Japan',
            currentLocation: {lat: -36.8485, lng: 174.7633},
            currentIndex: 0,
            transitIndex: 0,
            currentMarker: null,
            defaultMarker: { 
                path: 'M 0, 0 m -20, 0 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0',
                fillColor: 'gray',
                fillOpacity: 1,
                scale: 0.4,
                strokeColor: 'white',
                strokeWeight: 1,
            },
            selectedMarker: { 
                path: 'M 0, 0 m -20, 0 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0',
                fillColor: '#4d5ab3',
                fillOpacity: 1,
                scale: 0.5,
                strokeColor: 'white',
                strokeWeight: 1,
            },
            polyArrow: { 
                'strokeColor': '#FFFFFF',
                'strokeOpacity': 0.7,
                'strokeWeight': 2,
                'geodesic': true,
                icons: [{
                    icon: {
                        path: 'M-10 -10,0 -30, 10,-10 Z',
                        fillColor: '#cccccc',
                        fillOpacity: 1,
                        strokeWeight: 1,
                        strokeColor: 'white',
                        scale: 0.6,
                    },
                    offset: '50%',
                    repeat: '100px'
                }]
            },
            polyTransit: { 
                'strokeColor': '#FFFFFF',
                'strokeOpacity': 0.7,
                'strokeWeight': 2,
                'geodesic': true,
                icons: [{
                    icon: {
                        path: 'M-10 -10,0 -30, 10,-10 Z',
                        fillColor: 'green',
                        fillOpacity: 1,
                        strokeWeight: 1.25,
                        strokeColor: 'white',
                        scale: 1,
                    },
                    offset: '50%',
                    repeat: '100px'
                }]
            },
            itinerary : [
                {
                    name : 'Wellington, New Zealand',
                    location : {lat: -41.2865, lng: 174.7762},
                    start : 'Wed, 15 Jan 2020 09:30:00 GMT+13',
                    end : 'Wed, 15 Jan 2020 18:30:00 GMT+13',
                    notes : 'Normal day of work, have to pack and double check weight of bag',
                    days : [
                        {
                            date : 'Wed, 15th',
                            activities: [ 
                                {
                                    name : 'Transit',
                                    desc : 'Fly to Auckland, flight at 6:45pm',
                                },
                            ]
                        },
                    ]
                },
                {
                    name : 'Auckland, New Zealand',
                    location : {lat: -36.8485, lng: 174.7633},
                    start : 'Wed, 15 Jan 2020 18:30:00 GMT+13',
                    end : 'Thu, 16 Jan 2020 14:00:00 GMT+13',
                    notes : 'Depart Auckland 2:05pm. Need to be at the airport by about 11am (3hrs before flight)',
                    days : [
                        {
                            date : 'Thu, 16th',
                            activities: [ 
                                {
                                    name : 'Leave for Fiji',
                                    desc : 'Flight at 2pm',
                                },
                            ]
                        }
                    ]
                },
                {
                    name : 'Nadi, Fiji',
                    location : {lat: -17.7765, lng: 177.4356},
                    start : 'Thur, 16 Jan 2020 18:30:00 GMT+12',
                    end : 'Fri, 17 Jan 2020 14:05:00 GMT+12',
                    notes : '',
                    days : [
                        {
                            date : 'Thu, 16th',                            
                            activities: [ 
                                {
                                    name : 'Layover',
                                    desc : 'Arrive in Nadi for the night'
                                },
                            ]
                        },
                        {
                            date : 'Fri, 17th',                            
                            activities: [ 
                                {
                                    name : 'Layover',
                                    desc : 'Leave for Tokyo at 2pm'
                                },
                            ]
                        }
                    ]
                },
                {
                    name : 'Tokyo, Japan',
                    location : {lat: 35.6762, lng: 139.6503},
                    start : 'Fri, 17 Jan 2020 19:30:00 GMT+9',
                    end : 'Sat, 25 Jan 2020 20:15:00 GMT+9',
                    notes : '• Buy a prepaid <a href="https://www.jreast.co.jp/e/pass/suica.html" target="_blank">SUICA card</a>, for local transit.',
                    days : [
                        {
                            date : 'Fri, 17th',                            
                            activities: [ 
                                {
                                    name : 'Arrive',
                                    desc : 'Land at Narita airport, terminal 2, trained to town, walked 30 min to hostel'
                                },
                                {
                                    name : 'Accom',
                                    desc : '<a href="https://goo.gl/maps/UqQPkSrFSxXwuALN8" target="_blank">Nui Hostel, Tokyo</a>'
                                },
                            ]
                        },
                        {
                            date : 'Sat, 18th',                            
                            activities: [ 
                                {
                                    name : 'Ramen for lunch',
                                    desc : 'Found a little place while waiting for the museum.'
                                },
                                {
                                    name : 'Samurai Museum',
                                    desc : 'Tour of Museum with a bit of history and a samurai demonstration.'
                                },
                            ]
                        },
                        {
                            date : 'Sun, 19th',                            
                            activities: [ 
                                {
                                    name : 'Hike Mt Nokogiri in Chiba. Depends on weather.',
                                    desc : 'Look at all the carvings and go for a bit of a hike. Wake up early, get a train out to chiba and find my way to <a href="https://goo.gl/maps/2jCrJs28dR2BFMnm9" target="_blank">nokogiriyama mountain</a>.'
                                },
                            ]
                        },
                        {
                            date : 'Mon, 20th',                            
                            activities: [ 
                                {
                                    name : 'Robot Restaurant?',
                                    desc : 'This is meant to be really weird but a fun time'
                                },
                            ]
                        },
                        {
                            date : 'Tue, 21st',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Wed, 22nd',                            
                            activities: [ 
                                {
                                    name : 'Sumo Wrestling',
                                    desc : 'Grand tournament match with dinner'
                                },
                            ]
                        },
                        {
                            date : 'Thu, 23rd',                            
                            activities: [ 
                                {
                                    name : '11am, Cooking class',
                                    desc : 'Okonominyaki, Japanese pizza cooking class'
                                },
                            ]
                        },
                        {
                            date : 'Fri, 24th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Sat, 25th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                    ]
                },
                {
                    name : 'Hakuba, Japan',
                    location : {lat: 36.6982, lng: 137.8619},
                    start : 'Sat, 25 Jan 2020 20:15:00 GMT+9',
                    end : 'Sat, 01 Feb 2020 16:15:00 GMT+9',
                    notes : '',
                    days : [
                        {
                            date : 'Sat 25th',                            
                            activities: [ 
                                {
                                    name : 'Accom',
                                    desc : '<a href="https://goo.gl/maps/orZ71nHY1xMXjGMH9" target="_blank">Gonola Hotel, Hakuba</a>'
                                },
                            ]
                        },
                        {
                            date : 'Sun 26th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Mon 27th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Tue 28th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Wed 29th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Thu 30th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Fri 31th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Sat 1st',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        }
                    ]
                },
                {
                    name : 'Osaka, Japan',
                    location : {lat: 34.6937, lng: 135.5023},
                    start : 'Sat, 01 Feb 2020 20:15:00 GMT+9',
                    end : 'Thu, 06 Feb 2020 20:15:00 GMT+9',
                    notes : '',
                    days : [
                        {
                            date : 'Sat 1st',                            
                            activities: [ 
                                {
                                    name : 'Arrive in Osaka',
                                    desc : ''
                                },
                                {
                                    name : 'Accom',
                                    desc : '<a href="https://g.page/jhoppers-osaka-guesthouse?share" target="_blank">J-Hoppers Osaka Guesthouse</a>'
                                },
                            ]
                        },
                        {
                            date : 'Sun 2nd',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Mon 3rd',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Tue 4th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Wed 5th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Thu 6th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        }
                    ]
                },
                {
                    name : 'Kyoto, Japan',
                    location : {lat: 35.011635, lng: 135.768036},
                    start : 'Thu, 06 Feb 2020 20:15:00 GMT+9',
                    end : 'Mon, 10 Feb 2020 20:15:00 GMT+9',
                    notes : '',
                    days : [
                        {
                            date : 'Thu 6th',                            
                            activities: [ 
                                {
                                    name : 'Arrive in Kyoto',
                                    desc : ''
                                },
                                {
                                    name : 'Accom',
                                    desc : '<a href="https://goo.gl/maps/o3AdBfh1XRXGvnom6" target="_blank">Mosaic Hostel, Kyoto</a>'
                                },
                            ]
                        },
                        {
                            date : 'Fri 7th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Sat 8th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Sun 9th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Sat 10th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                    ]
                },
                {
                    name : 'Niseko, Japan',
                    location : {lat: 42.8048, lng: 140.6874},
                    start : 'Mon, 10 Feb 2020 20:15:00 GMT+9',
                    end : 'Tue, 18 Feb 2020 20:15:00 GMT+9',
                    notes : '',
                    days : [
                        {
                            date : 'Mon 10th',                            
                            activities: [ 
                                {
                                    name : '6:30am Train to Hirafu',
                                    desc : 'All day train ride'
                                },
                                {
                                    name : 'Accom',
                                    desc : 'One night booked at <a href="https://goo.gl/maps/KbRLPSTkKzgSEcAo6" target="_blank">Ekinoyado Hirafu</a>'
                                },
                            ]
                        },
                        {
                            date : 'Tue 11th',                            
                            activities: [ 
                                {
                                    name : 'Accom',
                                    desc : 'Seven nights booked at <a href="https://goo.gl/maps/XN1ENE1FwkiFBAWp9" target="_blank">MyEcoLodge, Kutchan</a>'
                                },
                            ]
                        },
                        {
                            date : 'Wed 12th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Thu 13th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Fri 14th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Sat 15th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Sun 16th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Mon 17th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Tue 18th',                            
                            activities: [ 
                                {
                                    name : 'Last night in Accom',
                                    desc : 'Checkout from MyEcoLodge, Kutchan'
                                },
                            ]
                        },
                        {
                            date : 'Wed 19th',                            
                            activities: [ 
                                {
                                    name : 'No plans',
                                    desc : 'Am leaving the rest of the trip open at this stage to see what happens'
                                },
                            ]
                        },
                        {
                            date : 'Thu 20st',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Fri 21st',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Sat 22nd',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Sun 23rd',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Mon 24th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },

                    ]
                },
                {
                    name : 'Tokyo, Japan',
                    location : {lat: 35.6762, lng: 139.6503},
                    start : 'Tue, 25 Feb 2020 20:15:00 GMT+9',
                    end : 'Fri, 28 Feb 2020 20:15:00 GMT+9',
                    notes : '',
                    days : [
                        {
                            date : 'Tue 25th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Wed 26th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Thu 27th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Fri 28th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Sat 29th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                    ]
                },
            ],
        },
        computed: {
            maxIndex: function(){
                return this.itinerary.length - 1;
            },

            locations: function () {
                dualLocs = [];

                maxIndex = this.maxIndex;
                this.itinerary.forEach(function(item, index, parentThis = this, maxIndex = this.maxIndex) {     
                    if(index != maxIndex){
                        dualLocs.push([item.location, parentThis[index+1].location]);
                    }
                });
                return dualLocs;
            },

            locationMarks: function(){
                todaysDate = new Date();
                //this just gives a start point before the dates are figured out
                //newLocation = this.itinerary[0].location;
                currentMarker = this.currentMarker;
                defaultMarker = this.defaultMarker;
                polyArrow = this.polyArrow;
                polyTransit = this.polyTransit;
                
                newLocations = [];
                prevEndDate = null;
                

                this.itinerary.forEach(function(item, index, parentThis = this) {
                    itinerary = parentThis;
                    thisStartDate = new Date(item.start);
                    thisEndDate = new Date(item.end);
                    if(index != 0) prevEndDate = new Date(itinerary[index-1].end);

                    newItem = item;
                    newItem.marker = defaultMarker;
                    newItem.polyIcon = polyArrow;
                    outOfDate = true

                    // find out if we are between locations
                    // if nowDate falls between the previous end date and the next startDate                        
                    if(prevEndDate != null && todaysDate > prevEndDate && todaysDate < thisStartDate){
                        console.log('we\'re in transit mode')
                        newLocation = item.location;
                        newItem.marker = defaultMarker;
                        newLocations[index-1].polyIcon = polyTransit;
                        this.currentIndex = index;
                        outOfDate = false
                        // possibly set the polyline icon to the plane svg based on this flag, storing the icon like we store the marker
                    }

                    if(todaysDate >= thisStartDate && todaysDate <= thisEndDate){
                        //console.log('current location is ' + item.name)
                        newLocation = item.location;
                        newItem.marker = currentMarker;
                        this.currentIndex = index;
                        outOfDate = false
                    } 

                    // set the map pointer marker to the start point if we're out of travel dates
                    // if (outOfDate == true && index == 0) newItem.marker = currentMarker;

                    newLocations.push(newItem);

                });

                this.currentLocation = newLocation;


                return newLocations;
            },
        },

        methods: {
            centreTo: function(index) {
                coords = this.itinerary[index].location;
                this.currentIndex = index;
                this.$refs.yonderMap.$mapObject.panTo(coords)
                this.updateMarker(index);
            },
            navigate: function(index, state){
                if(state == 'prev' && index > 0) this.currentIndex = index - 1;
                if(state == 'next' && index < this.maxIndex) this.currentIndex = index + 1;
                this.selectMarker(this.currentIndex);
            },
            updateMarker: function(index) {
                this.$refs.marker.forEach(function(item){
                    if(item.$markerObject.icon !== null){
                        item.$markerObject.setIcon(this.defaultMarker);
                    } 
                });
                // this needs to be updated to deal with transit
                if(this.$refs.marker[index].$markerObject.icon !== null) {
                    this.$refs.marker[index].$markerObject.setIcon(this.selectedMarker);
                }
            },
            selectMarker: function(index) {
                // if (!index) index = this.currentIndex;
                this.centreTo(index);
                this.scrollToCard(index);
                
            },
            scrollToCard: function(index) {
                VueScrollTo.scrollTo('#'+this.$refs.destinations[index].id, 500, {container: '#scroller'})
            },
        },
        filters: {
            simpleDate: function (value) {

                if (!value) return ''
                value = value.toString()
                var d = new Date(value);

                const nth = function(d) {
                    if (d > 3 && d < 21) return 'th';
                    switch (d % 10) {
                        case 1:  return "st";
                        case 2:  return "nd";
                        case 3:  return "rd";
                        default: return "th";
                    }
                }

                const days = [
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat'
                ];

                const months = [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ];

                const dayIndex = d.getDay();
                const dayName = days[dayIndex];
                const dayNum = d.getDate(); 
                const monthIndex = d.getMonth();
                const monthName = months[monthIndex];
                return dayName + ', ' + dayNum + nth(dayNum) + ' ' + monthName;
            }
        },
    });


    Vue.nextTick(function () {
        //vm.updateLocation()
        console.log('tick');
        vm.scrollToCard(this.currentIndex);

        // test area

        // console.log(dualLocs)
        // console.log('locs')
        //console.log(vm.locations)

    });

});