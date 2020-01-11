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
            currentMarker: null,
            defaultMarker: { 
                path: 'M 0, 0 m -20, 0 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0',
                fillColor: 'gray',
                fillOpacity: 1,
                scale: 0.4,
                strokeColor: 'white',
                strokeWeight: 1
            },
            selectedMarker: { 
                path: 'M 0, 0 m -20, 0 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0',
                fillColor: '#4d5ab3',
                fillOpacity: 1,
                scale: 0.5,
                strokeColor: 'white',
                strokeWeight: 1
            },
            itinerary : [
                {
                    name : 'Wellington, New Zealand',
                    location : {lat: -41.2865, lng: 174.7762},
                    start : 'Tue, 7 Jan 2020 12:30:00 GMT+13',
                    end : 'Wed, 15 Jan 2020 18:30:00 GMT+13',
                    notes : 'Normal day of work, have to pack and double check weight of bag',
                    days : [
                        {
                            date : 'Wed, 15th',
                            activities: [ 
                                {
                                    name : 'Transit',
                                    desc : 'Fly to Auckland at 6:30pm',
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
                    notes : 'Need to be at the airport by aboput 11am (3hrs before flight)',
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
                    end : 'Fri, 17 Jan 2020 14:00:00 GMT+12',
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
                    start : 'Fri, 17 Jan 2020 18:30:00 GMT+9',
                    end : 'Sat, 25 Jan 2020 20:15:00 GMT+9',
                    notes : '',
                    days : [
                        {
                            date : 'Fri, 17th',                            
                            activities: [ 
                                {
                                    name : 'Arrive',
                                    desc : 'Land at Narita airport, terminal 2, get bus to Hostel $14'
                                },
                            ]
                        },
                        {
                            date : 'Sat, 18th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Sun, 19th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Mon, 20th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
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
                                    name : '',
                                    desc : ''
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
                            ]
                        },
                        {
                            date : 'Tue 11th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
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
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                    ]
                },
                {
                    name : 'Seoul, Korea',
                    location : {lat: 37.566536, lng: 126.977966},
                    start : 'Tue, 18 Feb 2020 20:15:00 GMT+9',
                    end : 'Mon, 24 Feb 2020 20:15:00 GMT+9',
                    notes : '',
                    days : [
                        {
                            date : 'Tue 18th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Wed 20th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Thu 21st',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Fri 22nd',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Sat 28rd',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Sun 24th',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        },
                        {
                            date : 'Mon 25th',                            
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
            locations: function () {
                locs = [];
                
                this.itinerary.forEach(function(item) {

                    locs.push(item.location)

                });
                return locs;
            },
            locationMarks: function(){
                todaysDate = new Date();
                //this just gives a start point before the dates are figured out
                newLocation = this.itinerary[0].location;
                currentMarker = this.currentMarker;
                defaultMarker = this.defaultMarker;
                newLocations = [];

                this.itinerary.forEach(function(item) {
                    thisStartDate = new Date(item.start);
                    thisEndDate = new Date(item.end);

                    newItem = item;
                    newItem.marker = defaultMarker;

                    if(todaysDate >= thisStartDate && todaysDate <= thisEndDate){
                        newLocation = item.location;
                        item.marker = currentMarker;
                    } 
                    newLocations.push(newItem);

                });

                this.currentLocation = newLocation;

                return newLocations;
            },
        },

        methods: {
            centreTo: function(index) {
                coords = this.itinerary[index].location;
                this.$refs.yonderMap.$mapObject.panTo(coords)
                this.updateMarker(index);
            },
            updateMarker: function(index) {
                this.$refs.marker.forEach(function(item){
                    if(item.$markerObject.icon !== null){
                        item.$markerObject.setIcon(this.defaultMarker);
                    } 
                });
                if(this.$refs.marker[index].$markerObject.icon !== null) {
                    this.$refs.marker[index].$markerObject.setIcon(this.selectedMarker);
                }
            },
            selectMarker: function(index) {
                this.centreTo(index);
                VueScrollTo.scrollTo('#'+this.$refs.destinations[index].id, 500, {container: '#scroller'})
            }
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
    });

});