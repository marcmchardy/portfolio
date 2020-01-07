Vue.use(VueGoogleMaps, {
    load: {
        // need to restrict this to domain from google console
        key: 'AIzaSyAJsk5gQoURIkO5a2LirOeHolg-wcIEV0I',
        libraries: 'geometry',
    }
});

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
                                    desc : 'Land at Narita airport, get bus to Hostel'
                                },
                            ]
                        },
                        {
                            date : 'Sat, 18th',                            
                            activities: [ 
                                {
                                    name : 'Arrive',
                                    desc : 'Land at Narita airport, get bus to Hostel'
                                },
                            ]
                        },
                        {
                            date : 'Sun, 19th',                            
                            activities: [ 
                                {
                                    name : 'Arrive',
                                    desc : 'Land at Narita airport, get bus to Hostel'
                                },
                            ]
                        },
                        {
                            date : 'Mon, 20th',                            
                            activities: [ 
                                {
                                    name : 'Arrive',
                                    desc : 'Land at Narita airport, get bus to Hostel'
                                },
                            ]
                        },
                        {
                            date : 'Tue, 21st',                            
                            activities: [ 
                                {
                                    name : 'Arrive',
                                    desc : 'Land at Narita airport, get bus to Hostel'
                                },
                            ]
                        },
                        {
                            date : 'Wed, 22nd',                            
                            activities: [ 
                                {
                                    name : 'Arrive',
                                    desc : 'Land at Narita airport, get bus to Hostel'
                                },
                            ]
                        },
                        {
                            date : 'Thu, 23rd',                            
                            activities: [ 
                                {
                                    name : 'Arrive',
                                    desc : 'Land at Narita airport, get bus to Hostel'
                                },
                            ]
                        },
                        {
                            date : 'Fri, 24th',                            
                            activities: [ 
                                {
                                    name : 'Arrive',
                                    desc : 'Land at Narita airport, get bus to Hostel'
                                },
                            ]
                        },
                        {
                            date : 'Sat, 25th',                            
                            activities: [ 
                                {
                                    name : 'Arrive',
                                    desc : 'Land at Narita airport, get bus to Hostel'
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
                            date : '',                            
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
                    location : {lat: 36.6982, lng: 137.8619},
                    start : 'Sun, 02 Feb 2020 20:15:00 GMT+9',
                    end : 'Thu, 06 Feb 2020 20:15:00 GMT+9',
                    notes : '',
                    days : [
                        {
                            date : '',                            
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
                    name : 'Hiroshima, Japan',
                    location : {lat: 34.385204, lng: 132.455292},
                    start : 'Fri, 07 Feb 2020 20:15:00 GMT+9',
                    end : 'Mon, 10 Feb 2020 20:15:00 GMT+9',
                    notes : '',
                    days : [
                        {
                            date : '',                            
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
                    start : 'Fri, 07 Feb 2020 20:15:00 GMT+9',
                    end : 'Mon, 10 Feb 2020 20:15:00 GMT+9',
                    notes : '',
                    days : [
                        {
                            date : '',                            
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
                    name : 'Niseko, Japan',
                    location : {lat: 42.8048, lng: 140.6874},
                    start : 'Tue, 11 Feb 2020 20:15:00 GMT+9',
                    end : 'Tue, 18 Feb 2020 20:15:00 GMT+9',
                    notes : '',
                    days : [
                        {
                            date : '',                            
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
                    name : 'Seoul, Korea',
                    location : {lat: 37.566536, lng: 126.977966},
                    start : 'Wed, 19 Feb 2020 20:15:00 GMT+9',
                    end : 'Mon, 24 Feb 2020 20:15:00 GMT+9',
                    notes : '',
                    days : [
                        {
                            date : '',                            
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
                    name : 'Tokyo, Japan',
                    location : {lat: 35.6762, lng: 139.6503},
                    start : 'Tue, 25 Feb 2020 20:15:00 GMT+9',
                    end : 'Fri, 28 Feb 2020 20:15:00 GMT+9',
                    notes : '',
                    days : [
                        {
                            date : '',                            
                            activities: [ 
                                {
                                    name : '',
                                    desc : ''
                                },
                            ]
                        }
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
        methods: {
            centreTo: function(coords) {
                this.$refs.yonderMap.$mapObject.panTo(coords)

            },
            updateLocation: function () {
                todaysDate = new Date();
                newLocation = this.itinerary[0].location;
                currentMarker = this.currentMarker;
                defaultMarker = this.defaultMarker;

                this.itinerary.forEach(function(item) {
                    thisStartDate = new Date(item.start);
                    thisEndDate = new Date(item.end);

                    item.marker = defaultMarker;

                    if(todaysDate >= thisStartDate && todaysDate <= thisEndDate){
                        newLocation = item.location;
                        item.marker = currentMarker;
                    } 

                });

                this.currentLocation = newLocation;
            }
          }
    });


    Vue.nextTick(function () {
        vm.updateLocation()
    });


    
    

});