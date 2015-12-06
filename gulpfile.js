'use strict';

// All used modules.
var babel = require('gulp-babel');
var gulp = require('gulp');
var runSeq = require('run-sequence');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var karma = require('karma').server;
var istanbul = require('gulp-istanbul');
var models = require('./server/db/models');
var mongoose = require('mongoose');

var yelpJson = {
    "region": {
        "span": {
            "latitude_delta": 0.044068200000012325, 
            "longitude_delta": 0.05020143031396174
        }, 
        "center": {
            "latitude": 40.80003, 
            "longitude": -73.9706228319609
        }
    }, 
    "total": 1000, 
    "businesses": [
        {
            "is_claimed": true, 
            "rating": 4.5, 
            "mobile_url": "http://m.yelp.com/biz/little-italy-pizza-new-york-17", 
            "rating_img_url": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png", 
            "review_count": 70, 
            "name": "Little Italy Pizza", 
            "rating_img_url_small": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png", 
            "url": "http://www.yelp.com/biz/little-italy-pizza-new-york-17", 
            "categories": [
                [
                    "Pizza", 
                    "pizza"
                ], 
                [
                    "Italian", 
                    "italian"
                ]
            ], 
            "menu_date_updated": 1442206608, 
            "phone": "2127876700", 
            "snippet_text": "Is there a reason why Italy is always referred to as little? As a country, it seems pretty decently sized. It doesn't make much sense to me, it's like...", 
            "image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/Famw2q_D-DNPtIDTRk56mw/ms.jpg", 
            "snippet_image_url": "http://s3-media2.fl.yelpcdn.com/photo/zA0ApYrIkzB19BpAYCDiqw/ms.jpg", 
            "display_phone": "+1-212-787-6700", 
            "rating_img_url_large": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png", 
            "menu_provider": "single_platform", 
            "id": "little-italy-pizza-new-york-17", 
            "is_closed": false, 
            "location": {
                "cross_streets": "92nd St & 91st St", 
                "city": "New York", 
                "display_address": [
                    "2476 Broadway", 
                    "Upper West Side", 
                    "New York, NY 10025"
                ], 
                "geo_accuracy": 9.5, 
                "neighborhoods": [
                    "Upper West Side"
                ], 
                "postal_code": "10025", 
                "country_code": "US", 
                "address": [
                    "2476 Broadway"
                ], 
                "coordinate": {
                    "latitude": 40.7918751922647, 
                    "longitude": -73.9735541478506
                }, 
                "state_code": "NY"
            }
        }, 
        {
            "is_claimed": true, 
            "rating": 4.0, 
            "mobile_url": "http://m.yelp.com/biz/buchetta-brick-oven-pizza-new-york", 
            "rating_img_url": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png", 
            "review_count": 134, 
            "name": "Buchetta Brick Oven Pizza", 
            "rating_img_url_small": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png", 
            "url": "http://www.yelp.com/biz/buchetta-brick-oven-pizza-new-york", 
            "categories": [
                [
                    "Pizza", 
                    "pizza"
                ], 
                [
                    "Italian", 
                    "italian"
                ]
            ], 
            "phone": "2125318730", 
            "snippet_text": "This was everything I like in a restaurant: local yet true to Italian cuisine (everyone there speaks Italian), small menu but excellent, hole in the wall...", 
            "image_url": "http://s3-media3.fl.yelpcdn.com/bphoto/1Dfy0PUWqrZRABnjNbiGYg/ms.jpg", 
            "snippet_image_url": "http://s3-media1.fl.yelpcdn.com/photo/WDfdPoEfjJ7eV_K2gFfpKA/ms.jpg", 
            "display_phone": "+1-212-531-8730", 
            "rating_img_url_large": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png", 
            "id": "buchetta-brick-oven-pizza-new-york", 
            "is_closed": false, 
            "location": {
                "cross_streets": "Amsterdam Ave & Broadway", 
                "city": "New York", 
                "display_address": [
                    "201 W 103rd St", 
                    "Manhattan Valley", 
                    "New York, NY 10025"
                ], 
                "geo_accuracy": 9.5, 
                "neighborhoods": [
                    "Manhattan Valley"
                ], 
                "postal_code": "10025", 
                "country_code": "US", 
                "address": [
                    "201 W 103rd St"
                ], 
                "coordinate": {
                    "latitude": 40.7987564, 
                    "longitude": -73.9673846
                }, 
                "state_code": "NY"
            }
        }, 
        {
            "is_claimed": true, 
            "rating": 4.5, 
            "mobile_url": "http://m.yelp.com/biz/harlem-pizza-co-new-york", 
            "rating_img_url": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png", 
            "review_count": 66, 
            "name": "Harlem Pizza co.", 
            "rating_img_url_small": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png", 
            "url": "http://www.yelp.com/biz/harlem-pizza-co-new-york", 
            "categories": [
                [
                    "Pizza", 
                    "pizza"
                ]
            ], 
            "phone": "2122229889", 
            "snippet_text": "Can't wait to return! This was one of the best if not the best pizza I ever had. Very light, great toppings and I came out feeling like I actually ate...", 
            "image_url": "http://s3-media3.fl.yelpcdn.com/bphoto/xPC5SkfrIg32a9sd1SDw6Q/ms.jpg", 
            "snippet_image_url": "http://s3-media1.fl.yelpcdn.com/photo/dBIVmZ_9TPf5GJokao8XKw/ms.jpg", 
            "display_phone": "+1-212-222-9889", 
            "rating_img_url_large": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png", 
            "id": "harlem-pizza-co-new-york", 
            "is_closed": false, 
            "location": {
                "city": "New York", 
                "display_address": [
                    "135 West 116 St.", 
                    "Harlem", 
                    "New York, NY 10026"
                ], 
                "geo_accuracy": 8.0, 
                "neighborhoods": [
                    "Harlem"
                ], 
                "postal_code": "10026", 
                "country_code": "US", 
                "address": [
                    "135 West 116 St."
                ], 
                "coordinate": {
                    "latitude": 40.802914, 
                    "longitude": -73.951065
                }, 
                "state_code": "NY"
            }
        }, 
        {
            "is_claimed": false, 
            "rating": 4.0, 
            "mobile_url": "http://m.yelp.com/biz/numero-28-upper-west-side-new-york-2", 
            "rating_img_url": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png", 
            "review_count": 106, 
            "name": "Numero 28 Upper West Side", 
            "rating_img_url_small": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png", 
            "url": "http://www.yelp.com/biz/numero-28-upper-west-side-new-york-2", 
            "categories": [
                [
                    "Pizza", 
                    "pizza"
                ], 
                [
                    "Italian", 
                    "italian"
                ]
            ], 
            "menu_date_updated": 1448591486, 
            "phone": "2127067282", 
            "snippet_text": "This place is AMAZING! I've been dining regularly at Número 28 UWS for 2 years now and have yet to find something negative to say. Everything always tastes...", 
            "image_url": "http://s3-media1.fl.yelpcdn.com/bphoto/FQPRyOsVaCeTosFKH5b0BA/ms.jpg", 
            "snippet_image_url": "http://s3-media2.fl.yelpcdn.com/photo/D4kNpV81xBxUj5P2kzsE_Q/ms.jpg", 
            "display_phone": "+1-212-706-7282", 
            "rating_img_url_large": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png", 
            "menu_provider": "eat24", 
            "id": "numero-28-upper-west-side-new-york-2", 
            "is_closed": false, 
            "location": {
                "cross_streets": "93rd St & 92nd St", 
                "city": "New York", 
                "display_address": [
                    "660 Amsterdam Ave", 
                    "Upper West Side", 
                    "New York, NY 10025"
                ], 
                "geo_accuracy": 8.0, 
                "neighborhoods": [
                    "Upper West Side"
                ], 
                "postal_code": "10025", 
                "country_code": "US", 
                "address": [
                    "660 Amsterdam Ave"
                ], 
                "coordinate": {
                    "latitude": 40.79177, 
                    "longitude": -73.9722203
                }, 
                "state_code": "NY"
            }
        }, 
        {
            "is_claimed": false, 
            "rating": 3.5, 
            "mobile_url": "http://m.yelp.com/biz/koronet-pizza-new-york", 
            "rating_img_url": "http://s3-media1.fl.yelpcdn.com/assets/2/www/img/5ef3eb3cb162/ico/stars/v1/stars_3_half.png", 
            "review_count": 495, 
            "name": "Koronet Pizza", 
            "rating_img_url_small": "http://s3-media1.fl.yelpcdn.com/assets/2/www/img/2e909d5d3536/ico/stars/v1/stars_small_3_half.png", 
            "url": "http://www.yelp.com/biz/koronet-pizza-new-york", 
            "categories": [
                [
                    "Pizza", 
                    "pizza"
                ]
            ], 
            "menu_date_updated": 1442356010, 
            "phone": "2122221566", 
            "snippet_text": "Koronet is an institution if you go to Columbia.  It's like Brian Greene, Oliver Sacks, Allen Ginsberg, Ted Mosby, and Koronet's pizza; these are the things...", 
            "image_url": "http://s3-media3.fl.yelpcdn.com/bphoto/FXT4NcMxHbDJ_SDRK4BH0A/ms.jpg", 
            "snippet_image_url": "http://s3-media4.fl.yelpcdn.com/photo/WJOf5ZitBQ0MNGxG-AwZwg/ms.jpg", 
            "display_phone": "+1-212-222-1566", 
            "rating_img_url_large": "http://s3-media3.fl.yelpcdn.com/assets/2/www/img/bd9b7a815d1b/ico/stars/v1/stars_large_3_half.png", 
            "menu_provider": "single_platform", 
            "id": "koronet-pizza-new-york", 
            "is_closed": false, 
            "location": {
                "cross_streets": "111th St & Cathedral Pky", 
                "city": "New York", 
                "display_address": [
                    "2848 Broadway", 
                    "Morningside Heights", 
                    "New York, NY 10025"
                ], 
                "geo_accuracy": 8.0, 
                "neighborhoods": [
                    "Morningside Heights"
                ], 
                "postal_code": "10025", 
                "country_code": "US", 
                "address": [
                    "2848 Broadway"
                ], 
                "coordinate": {
                    "latitude": 40.80442, 
                    "longitude": -73.966056
                }, 
                "state_code": "NY"
            }
        }, 
        {
            "is_claimed": true, 
            "rating": 3.5, 
            "mobile_url": "http://m.yelp.com/biz/sal-and-carmines-pizza-new-york", 
            "rating_img_url": "http://s3-media1.fl.yelpcdn.com/assets/2/www/img/5ef3eb3cb162/ico/stars/v1/stars_3_half.png", 
            "review_count": 240, 
            "name": "Sal & Carmine's Pizza", 
            "rating_img_url_small": "http://s3-media1.fl.yelpcdn.com/assets/2/www/img/2e909d5d3536/ico/stars/v1/stars_small_3_half.png", 
            "url": "http://www.yelp.com/biz/sal-and-carmines-pizza-new-york", 
            "categories": [
                [
                    "Pizza", 
                    "pizza"
                ], 
                [
                    "Italian", 
                    "italian"
                ]
            ], 
            "menu_date_updated": 1447200014, 
            "phone": "2126637651", 
            "snippet_text": "I was staying on the upper west side and my cousin suggested we go here since it was close by. It's a cute hole in the wall pizza place. I got a slice of...", 
            "image_url": "http://s3-media1.fl.yelpcdn.com/bphoto/Q8WE381HIx1qqb90GLSTeA/ms.jpg", 
            "snippet_image_url": "http://s3-media2.fl.yelpcdn.com/photo/aPUSLVbGpCxb25l26vjC9A/ms.jpg", 
            "display_phone": "+1-212-663-7651", 
            "rating_img_url_large": "http://s3-media3.fl.yelpcdn.com/assets/2/www/img/bd9b7a815d1b/ico/stars/v1/stars_large_3_half.png", 
            "menu_provider": "eat24", 
            "id": "sal-and-carmines-pizza-new-york", 
            "is_closed": false, 
            "location": {
                "cross_streets": "101st St & 102nd St", 
                "city": "New York", 
                "display_address": [
                    "2671 Broadway", 
                    "Manhattan Valley", 
                    "New York, NY 10025"
                ], 
                "geo_accuracy": 8.0, 
                "neighborhoods": [
                    "Manhattan Valley"
                ], 
                "postal_code": "10025", 
                "country_code": "US", 
                "address": [
                    "2671 Broadway"
                ], 
                "coordinate": {
                    "latitude": 40.7983115, 
                    "longitude": -73.9694405
                }, 
                "state_code": "NY"
            }
        }, 
        {
            "is_claimed": false, 
            "rating": 4.0, 
            "mobile_url": "http://m.yelp.com/biz/macchina-new-york", 
            "rating_img_url": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png", 
            "review_count": 37, 
            "name": "Macchina", 
            "rating_img_url_small": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png", 
            "url": "http://www.yelp.com/biz/macchina-new-york", 
            "categories": [
                [
                    "Pizza", 
                    "pizza"
                ], 
                [
                    "Italian", 
                    "italian"
                ]
            ], 
            "phone": "2122039954", 
            "snippet_text": "Really kind staff all around, from bartender to hostess, waiter and buss boy. I was surprised with how quickly the food came out and it was really...", 
            "image_url": "http://s3-media4.fl.yelpcdn.com/bphoto/ASMClxLghZn9gkPOOAFrOw/ms.jpg", 
            "snippet_image_url": "http://s3-media3.fl.yelpcdn.com/photo/lQt0xtuqdbIUhK0ZNnVHsA/ms.jpg", 
            "display_phone": "+1-212-203-9954", 
            "rating_img_url_large": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png", 
            "id": "macchina-new-york", 
            "is_closed": false, 
            "location": {
                "cross_streets": "106th St & 107th St", 
                "city": "New York", 
                "display_address": [
                    "2758 Broadway", 
                    "Manhattan Valley", 
                    "New York, NY 10025"
                ], 
                "geo_accuracy": 8.0, 
                "neighborhoods": [
                    "Manhattan Valley"
                ], 
                "postal_code": "10025", 
                "country_code": "US", 
                "address": [
                    "2758 Broadway"
                ], 
                "coordinate": {
                    "latitude": 40.8010101318359, 
                    "longitude": -73.9675140380859
                }, 
                "state_code": "NY"
            }
        }, 
        {
            "is_claimed": true, 
            "rating": 4.0, 
            "mobile_url": "http://m.yelp.com/biz/celeste-new-york", 
            "rating_img_url": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png", 
            "review_count": 657, 
            "name": "Celeste", 
            "rating_img_url_small": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png", 
            "url": "http://www.yelp.com/biz/celeste-new-york", 
            "categories": [
                [
                    "Italian", 
                    "italian"
                ], 
                [
                    "Pizza", 
                    "pizza"
                ]
            ], 
            "menu_date_updated": 1442259594, 
            "phone": "2128744559", 
            "snippet_text": "This place is wonderful!\n\nI had a great dinner here, we walked in around 5:30pm or so on a Sunday and we got a seat right away but towards the middle of our...", 
            "image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/vwJ8Atdgpy268UgXybC97w/ms.jpg", 
            "snippet_image_url": "http://s3-media2.fl.yelpcdn.com/photo/h4bL8uDmwwH1GhHKCgDqXA/ms.jpg", 
            "display_phone": "+1-212-874-4559", 
            "rating_img_url_large": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png", 
            "menu_provider": "single_platform", 
            "id": "celeste-new-york", 
            "is_closed": false, 
            "location": {
                "cross_streets": "84th St & 85th St", 
                "city": "New York", 
                "display_address": [
                    "502 Amsterdam Ave", 
                    "Upper West Side", 
                    "New York, NY 10024"
                ], 
                "geo_accuracy": 8.0, 
                "neighborhoods": [
                    "Upper West Side"
                ], 
                "postal_code": "10024", 
                "country_code": "US", 
                "address": [
                    "502 Amsterdam Ave"
                ], 
                "coordinate": {
                    "latitude": 40.786712, 
                    "longitude": -73.976127
                }, 
                "state_code": "NY"
            }
        }, 
        {
            "is_claimed": true, 
            "rating": 4.0, 
            "mobile_url": "http://m.yelp.com/biz/custom-fuel-pizza-new-york", 
            "rating_img_url": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png", 
            "review_count": 141, 
            "name": "Custom Fuel Pizza", 
            "rating_img_url_small": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png", 
            "url": "http://www.yelp.com/biz/custom-fuel-pizza-new-york", 
            "categories": [
                [
                    "Pizza", 
                    "pizza"
                ]
            ], 
            "menu_date_updated": 1442203355, 
            "phone": "6465245636", 
            "snippet_text": "Fresh ingredients and pizza made to order very quickly. Friendly staff always make for a positive experience.\n\nOh I forgot to mention that the pizza is...", 
            "image_url": "http://s3-media3.fl.yelpcdn.com/bphoto/DhPxP9gC_OJGHfyPSSSZCw/ms.jpg", 
            "snippet_image_url": "http://s3-media2.fl.yelpcdn.com/photo/8L2rujDf26zgM9ueu-BNPA/ms.jpg", 
            "display_phone": "+1-646-524-5636", 
            "rating_img_url_large": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png", 
            "menu_provider": "single_platform", 
            "id": "custom-fuel-pizza-new-york", 
            "is_closed": false, 
            "location": {
                "city": "New York", 
                "display_address": [
                    "2288 Frederick Douglass Blvd", 
                    "Harlem", 
                    "New York, NY 10027"
                ], 
                "geo_accuracy": 9.5, 
                "neighborhoods": [
                    "Harlem"
                ], 
                "postal_code": "10027", 
                "country_code": "US", 
                "address": [
                    "2288 Frederick Douglass Blvd"
                ], 
                "coordinate": {
                    "latitude": 40.8087844, 
                    "longitude": -73.9520398
                }, 
                "state_code": "NY"
            }
        }, 
        {
            "is_claimed": true, 
            "rating": 4.0, 
            "mobile_url": "http://m.yelp.com/biz/bettolona-new-york", 
            "rating_img_url": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png", 
            "review_count": 189, 
            "name": "Bettolona", 
            "rating_img_url_small": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png", 
            "url": "http://www.yelp.com/biz/bettolona-new-york", 
            "categories": [
                [
                    "Pizza", 
                    "pizza"
                ], 
                [
                    "Italian", 
                    "italian"
                ]
            ], 
            "menu_date_updated": 1447255176, 
            "phone": "2127491125", 
            "snippet_text": "Checked this place out this past weekend. It was fairly quiet when we first walked in, but when we left around 7:30 this place was pretty packed. The...", 
            "image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/mNROvw2MUqBlHJoamKBt4A/ms.jpg", 
            "snippet_image_url": "http://s3-media4.fl.yelpcdn.com/photo/-oyGy_8ahUakW4XU_eacNw/ms.jpg", 
            "display_phone": "+1-212-749-1125", 
            "rating_img_url_large": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png", 
            "menu_provider": "eat24", 
            "id": "bettolona-new-york", 
            "is_closed": false, 
            "location": {
                "cross_streets": "Tiemann Pl & La Salle St", 
                "city": "New York", 
                "display_address": [
                    "3143 Broadway", 
                    "Harlem", 
                    "New York, NY 10027"
                ], 
                "geo_accuracy": 9.5, 
                "neighborhoods": [
                    "Harlem"
                ], 
                "postal_code": "10027", 
                "country_code": "US", 
                "address": [
                    "3143 Broadway"
                ], 
                "coordinate": {
                    "latitude": 40.8141032, 
                    "longitude": -73.9597766
                }, 
                "state_code": "NY"
            }
        }, 
        {
            "is_claimed": false, 
            "rating": 4.0, 
            "mobile_url": "http://m.yelp.com/biz/brooklyns-coal-burning-brick-oven-pizzeria-edgewater", 
            "rating_img_url": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png", 
            "review_count": 133, 
            "name": "Brooklyn's Coal-Burning Brick-Oven Pizzeria", 
            "rating_img_url_small": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png", 
            "url": "http://www.yelp.com/biz/brooklyns-coal-burning-brick-oven-pizzeria-edgewater", 
            "categories": [
                [
                    "Pizza", 
                    "pizza"
                ]
            ], 
            "menu_date_updated": 1442257886, 
            "phone": "2019459096", 
            "snippet_text": "In NYC, pizza is a religion. Living in Brooklyn I was highly spoiled. Moving to NJ, I was very ... underwhelmed with the options. Yes, I am pizza snob and...", 
            "image_url": "http://s3-media4.fl.yelpcdn.com/bphoto/sHPhe2kfKlzU9VdBFkV1vw/ms.jpg", 
            "snippet_image_url": "http://s3-media1.fl.yelpcdn.com/photo/VNLtSp0zAmBz0CYnYU2t2Q/ms.jpg", 
            "display_phone": "+1-201-945-9096", 
            "rating_img_url_large": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png", 
            "menu_provider": "single_platform", 
            "id": "brooklyns-coal-burning-brick-oven-pizzeria-edgewater", 
            "is_closed": false, 
            "location": {
                "city": "Edgewater", 
                "display_address": [
                    "443 River Rd", 
                    "Edgewater, NJ 07020"
                ], 
                "geo_accuracy": 9.5, 
                "postal_code": "07020", 
                "country_code": "US", 
                "address": [
                    "443 River Rd"
                ], 
                "coordinate": {
                    "latitude": 40.813182685622, 
                    "longitude": -73.984288823744
                }, 
                "state_code": "NJ"
            }
        }, 
        {
            "is_claimed": true, 
            "rating": 3.5, 
            "mobile_url": "http://m.yelp.com/biz/isola-on-columbus-new-york", 
            "rating_img_url": "http://s3-media1.fl.yelpcdn.com/assets/2/www/img/5ef3eb3cb162/ico/stars/v1/stars_3_half.png", 
            "review_count": 67, 
            "name": "Isola on Columbus", 
            "rating_img_url_small": "http://s3-media1.fl.yelpcdn.com/assets/2/www/img/2e909d5d3536/ico/stars/v1/stars_small_3_half.png", 
            "url": "http://www.yelp.com/biz/isola-on-columbus-new-york", 
            "categories": [
                [
                    "Italian", 
                    "italian"
                ], 
                [
                    "Pizza", 
                    "pizza"
                ]
            ], 
            "menu_date_updated": 1447198821, 
            "phone": "2126652970", 
            "snippet_text": "Always got a bit suspicious with that place , every time I was passing by it just felt like another Italian wannabe place.\n\nFinally we decided to go there...", 
            "image_url": "http://s3-media4.fl.yelpcdn.com/bphoto/YsI5oED4OOIyeyEaaKRZNg/ms.jpg", 
            "snippet_image_url": "http://s3-media1.fl.yelpcdn.com/photo/wddBo8Qo1UuS977k_wI_Cg/ms.jpg", 
            "display_phone": "+1-212-665-2970", 
            "rating_img_url_large": "http://s3-media3.fl.yelpcdn.com/assets/2/www/img/bd9b7a815d1b/ico/stars/v1/stars_large_3_half.png", 
            "menu_provider": "eat24", 
            "id": "isola-on-columbus-new-york", 
            "is_closed": false, 
            "location": {
                "cross_streets": "108th St & 109th St", 
                "city": "New York", 
                "display_address": [
                    "994 Columbus Ave", 
                    "Manhattan Valley", 
                    "New York, NY 10025"
                ], 
                "geo_accuracy": 8.0, 
                "neighborhoods": [
                    "Manhattan Valley"
                ], 
                "postal_code": "10025", 
                "country_code": "US", 
                "address": [
                    "994 Columbus Ave"
                ], 
                "coordinate": {
                    "latitude": 40.8012505, 
                    "longitude": -73.9616241
                }, 
                "state_code": "NY"
            }
        }, 
        {
            "is_claimed": true, 
            "rating": 4.0, 
            "mobile_url": "http://m.yelp.com/biz/lexington-pizza-parlour-new-york", 
            "rating_img_url": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png", 
            "review_count": 69, 
            "name": "Lexington Pizza Parlour", 
            "rating_img_url_small": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png", 
            "url": "http://www.yelp.com/biz/lexington-pizza-parlour-new-york", 
            "categories": [
                [
                    "Italian", 
                    "italian"
                ], 
                [
                    "Pizza", 
                    "pizza"
                ]
            ], 
            "menu_date_updated": 1447467494, 
            "phone": "2127227850", 
            "snippet_text": "I've passed Lexington Pizza Parlour a couple times, based off reviews and curiosity , a group of us decided to give it a try.\n\nWhat a Gem, We were...", 
            "image_url": "http://s3-media1.fl.yelpcdn.com/bphoto/eQu3rHT5sjQUJnkoJx7hXQ/ms.jpg", 
            "snippet_image_url": "http://s3-media1.fl.yelpcdn.com/photo/MSah13ym3G3K8gfaAVhZww/ms.jpg", 
            "display_phone": "+1-212-722-7850", 
            "rating_img_url_large": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png", 
            "menu_provider": "eat24", 
            "id": "lexington-pizza-parlour-new-york", 
            "is_closed": false, 
            "location": {
                "cross_streets": "101st St & 102nd St", 
                "city": "New York", 
                "display_address": [
                    "1590 Lexington Ave", 
                    "East Harlem", 
                    "New York, NY 10029"
                ], 
                "geo_accuracy": 9.5, 
                "neighborhoods": [
                    "East Harlem"
                ], 
                "postal_code": "10029", 
                "country_code": "US", 
                "address": [
                    "1590 Lexington Ave"
                ], 
                "coordinate": {
                    "latitude": 40.789283, 
                    "longitude": -73.9487429
                }, 
                "state_code": "NY"
            }
        }, 
        {
            "is_claimed": true, 
            "rating": 4.0, 
            "mobile_url": "http://m.yelp.com/biz/freddie-and-peppers-new-york", 
            "rating_img_url": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png", 
            "review_count": 220, 
            "name": "Freddie & Pepper's", 
            "rating_img_url_small": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png", 
            "url": "http://www.yelp.com/biz/freddie-and-peppers-new-york", 
            "categories": [
                [
                    "Pizza", 
                    "pizza"
                ]
            ], 
            "menu_date_updated": 1442355983, 
            "phone": "2127992463", 
            "snippet_text": "This place gets 5 stars for being different and standing out positively in a neighborhood with more variety in food choices than people!\n\nTheir pizza is...", 
            "image_url": "http://s3-media3.fl.yelpcdn.com/bphoto/i8N_oumiCz23TB6hVxPytQ/ms.jpg", 
            "snippet_image_url": "http://s3-media2.fl.yelpcdn.com/photo/yg49K_1kIul6Zzen_C8MIg/ms.jpg", 
            "display_phone": "+1-212-799-2463", 
            "rating_img_url_large": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png", 
            "menu_provider": "single_platform", 
            "id": "freddie-and-peppers-new-york", 
            "is_closed": false, 
            "location": {
                "cross_streets": "75th St & 74th St", 
                "city": "New York", 
                "display_address": [
                    "303 Amsterdam Ave", 
                    "Upper West Side", 
                    "New York, NY 10023"
                ], 
                "geo_accuracy": 9.5, 
                "neighborhoods": [
                    "Upper West Side"
                ], 
                "postal_code": "10023", 
                "country_code": "US", 
                "address": [
                    "303 Amsterdam Ave"
                ], 
                "coordinate": {
                    "latitude": 40.779999, 
                    "longitude": -73.980301
                }, 
                "state_code": "NY"
            }
        }, 
        {
            "is_claimed": true, 
            "rating": 4.0, 
            "mobile_url": "http://m.yelp.com/biz/porto-by-antonio-wood-burning-pizza-and-pasta-north-bergen", 
            "rating_img_url": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png", 
            "review_count": 105, 
            "name": "Porto By Antonio - Wood Burning Pizza & Pasta", 
            "rating_img_url_small": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png", 
            "url": "http://www.yelp.com/biz/porto-by-antonio-wood-burning-pizza-and-pasta-north-bergen", 
            "categories": [
                [
                    "Italian", 
                    "italian"
                ], 
                [
                    "Pizza", 
                    "pizza"
                ]
            ], 
            "menu_date_updated": 1442229065, 
            "phone": "2019417107", 
            "snippet_text": "Wow! @portobyantonio has to be the most authentic Neapolitan pizza's I have ever had since I visited Italy. The service was amazing... I was more amazed...", 
            "image_url": "http://s3-media1.fl.yelpcdn.com/bphoto/76Zca5ocJJdzvEeNZQN-GQ/ms.jpg", 
            "snippet_image_url": "http://s3-media1.fl.yelpcdn.com/photo/YosD_I0li45YYQqldBZz4Q/ms.jpg", 
            "display_phone": "+1-201-941-7107", 
            "rating_img_url_large": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png", 
            "menu_provider": "single_platform", 
            "id": "porto-by-antonio-wood-burning-pizza-and-pasta-north-bergen", 
            "is_closed": false, 
            "location": {
                "city": "North Bergen", 
                "display_address": [
                    "8921 Old River Rd", 
                    "North Bergen, NJ 07047"
                ], 
                "geo_accuracy": 9.5, 
                "postal_code": "07047", 
                "country_code": "US", 
                "address": [
                    "8921 Old River Rd"
                ], 
                "coordinate": {
                    "latitude": 40.8048834508642, 
                    "longitude": -73.9934416639218
                }, 
                "state_code": "NJ"
            }
        }, 
        {
            "is_claimed": true, 
            "rating": 4.0, 
            "mobile_url": "http://m.yelp.com/biz/nicks-pizza-new-york", 
            "rating_img_url": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png", 
            "review_count": 332, 
            "name": "Nick's Pizza", 
            "rating_img_url_small": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/f62a5be2f902/ico/stars/v1/stars_small_4.png", 
            "url": "http://www.yelp.com/biz/nicks-pizza-new-york", 
            "categories": [
                [
                    "Italian", 
                    "italian"
                ], 
                [
                    "Pizza", 
                    "pizza"
                ]
            ], 
            "menu_date_updated": 1449091242, 
            "phone": "2129875700", 
            "snippet_text": "This is my favorite pizza and Italian food on the upper east side! The entrees ain't too shabby either.  The interior is nice enough for a family dinner. I...", 
            "image_url": "http://s3-media1.fl.yelpcdn.com/bphoto/ZbZk3ekeV-fSNTIO9T9zJg/ms.jpg", 
            "snippet_image_url": "http://s3-media4.fl.yelpcdn.com/assets/srv0/yelp_styleguide/cc4afe21892e/assets/img/default_avatars/user_medium_square.png", 
            "display_phone": "+1-212-987-5700", 
            "rating_img_url_large": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/ccf2b76faa2c/ico/stars/v1/stars_large_4.png", 
            "menu_provider": "single_platform", 
            "id": "nicks-pizza-new-york", 
            "is_closed": false, 
            "location": {
                "cross_streets": "94th St & 93rd St", 
                "city": "New York", 
                "display_address": [
                    "1814 2nd Ave", 
                    "Upper East Side", 
                    "New York, NY 10128"
                ], 
                "geo_accuracy": 8.0, 
                "neighborhoods": [
                    "Upper East Side", 
                    "Yorkville"
                ], 
                "postal_code": "10128", 
                "country_code": "US", 
                "address": [
                    "1814 2nd Ave"
                ], 
                "coordinate": {
                    "latitude": 40.78271484375, 
                    "longitude": -73.9478073120117
                }, 
                "state_code": "NY"
            }
        }, 
        {
            "is_claimed": true, 
            "rating": 3.5, 
            "mobile_url": "http://m.yelp.com/biz/pizza-club-edgewater-4", 
            "rating_img_url": "http://s3-media1.fl.yelpcdn.com/assets/2/www/img/5ef3eb3cb162/ico/stars/v1/stars_3_half.png", 
            "review_count": 88, 
            "name": "Pizza Club", 
            "rating_img_url_small": "http://s3-media1.fl.yelpcdn.com/assets/2/www/img/2e909d5d3536/ico/stars/v1/stars_small_3_half.png", 
            "url": "http://www.yelp.com/biz/pizza-club-edgewater-4", 
            "categories": [
                [
                    "Pizza", 
                    "pizza"
                ], 
                [
                    "Italian", 
                    "italian"
                ]
            ], 
            "menu_date_updated": 1448709603, 
            "phone": "2019451111", 
            "snippet_text": "This should give you an idea of how good this place is: I used to eat here every day when I worked at Trader Joes which is in the same strip mall. I...", 
            "image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/GMvDCzO-niPIyJeurILROQ/ms.jpg", 
            "snippet_image_url": "http://s3-media1.fl.yelpcdn.com/photo/5-o2r3dP7hRdk16OVTTxKQ/ms.jpg", 
            "display_phone": "+1-201-945-1111", 
            "rating_img_url_large": "http://s3-media3.fl.yelpcdn.com/assets/2/www/img/bd9b7a815d1b/ico/stars/v1/stars_large_3_half.png", 
            "menu_provider": "eat24", 
            "id": "pizza-club-edgewater-4", 
            "is_closed": false, 
            "location": {
                "city": "Edgewater", 
                "display_address": [
                    "725 River Rd", 
                    "Ste 43", 
                    "Edgewater, NJ 07020"
                ], 
                "geo_accuracy": 9.5, 
                "postal_code": "07020", 
                "country_code": "US", 
                "address": [
                    "725 River Rd", 
                    "Ste 43"
                ], 
                "coordinate": {
                    "latitude": 40.820061, 
                    "longitude": -73.977184
                }, 
                "state_code": "NJ"
            }
        }, 
        {
            "is_claimed": false, 
            "rating": 3.5, 
            "mobile_url": "http://m.yelp.com/biz/mamas-pizzeria-new-york", 
            "rating_img_url": "http://s3-media1.fl.yelpcdn.com/assets/2/www/img/5ef3eb3cb162/ico/stars/v1/stars_3_half.png", 
            "review_count": 45, 
            "name": "Mama's Pizzeria", 
            "rating_img_url_small": "http://s3-media1.fl.yelpcdn.com/assets/2/www/img/2e909d5d3536/ico/stars/v1/stars_small_3_half.png", 
            "url": "http://www.yelp.com/biz/mamas-pizzeria-new-york", 
            "categories": [
                [
                    "Pizza", 
                    "pizza"
                ]
            ], 
            "menu_date_updated": 1442356016, 
            "phone": "2125313797", 
            "snippet_text": "I love this place!!! Their fried oreos and Zeppelins are to die for. You can't go wrong with this place. I also love their garlic breads. The staff there...", 
            "image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/JTzg2srFFv22gIDXp8PpXQ/ms.jpg", 
            "snippet_image_url": "http://s3-media2.fl.yelpcdn.com/photo/MFT22EEfqTQdzvVsjnFpvg/ms.jpg", 
            "display_phone": "+1-212-531-3797", 
            "rating_img_url_large": "http://s3-media3.fl.yelpcdn.com/assets/2/www/img/bd9b7a815d1b/ico/stars/v1/stars_large_3_half.png", 
            "menu_provider": "single_platform", 
            "id": "mamas-pizzeria-new-york", 
            "is_closed": false, 
            "location": {
                "cross_streets": "106th St & 107th St", 
                "city": "New York", 
                "display_address": [
                    "941 Amsterdam Ave", 
                    "Manhattan Valley", 
                    "New York, NY 10025"
                ], 
                "geo_accuracy": 8.0, 
                "neighborhoods": [
                    "Manhattan Valley"
                ], 
                "postal_code": "10025", 
                "country_code": "US", 
                "address": [
                    "941 Amsterdam Ave"
                ], 
                "coordinate": {
                    "latitude": 40.800453, 
                    "longitude": -73.965301
                }, 
                "state_code": "NY"
            }
        }, 
        {
            "is_claimed": true, 
            "rating": 3.5, 
            "mobile_url": "http://m.yelp.com/biz/two-boots-upper-west-side-new-york", 
            "rating_img_url": "http://s3-media1.fl.yelpcdn.com/assets/2/www/img/5ef3eb3cb162/ico/stars/v1/stars_3_half.png", 
            "review_count": 102, 
            "name": "Two Boots Upper West Side", 
            "rating_img_url_small": "http://s3-media1.fl.yelpcdn.com/assets/2/www/img/2e909d5d3536/ico/stars/v1/stars_small_3_half.png", 
            "url": "http://www.yelp.com/biz/two-boots-upper-west-side-new-york", 
            "categories": [
                [
                    "Pizza", 
                    "pizza"
                ], 
                [
                    "Italian", 
                    "italian"
                ]
            ], 
            "menu_date_updated": 1448594465, 
            "phone": "2122802668", 
            "snippet_text": "Love this location since the staff is uber friendly. I'm not crazy about the vegan pizza, but the vegan calzone is out of this world! The ricotta and...", 
            "image_url": "http://s3-media1.fl.yelpcdn.com/bphoto/pgjrmrwETrR4VkGU_N18Dw/ms.jpg", 
            "snippet_image_url": "http://s3-media3.fl.yelpcdn.com/photo/kmbuYTEgGKcXGRzNGFiUBg/ms.jpg", 
            "display_phone": "+1-212-280-2668", 
            "rating_img_url_large": "http://s3-media3.fl.yelpcdn.com/assets/2/www/img/bd9b7a815d1b/ico/stars/v1/stars_large_3_half.png", 
            "menu_provider": "eat24", 
            "id": "two-boots-upper-west-side-new-york", 
            "is_closed": false, 
            "location": {
                "cross_streets": "93rd St & 94th St", 
                "city": "New York", 
                "display_address": [
                    "2547 Broadway", 
                    "Upper West Side", 
                    "New York, NY 10025"
                ], 
                "geo_accuracy": 9.5, 
                "neighborhoods": [
                    "Upper West Side"
                ], 
                "postal_code": "10025", 
                "country_code": "US", 
                "address": [
                    "2547 Broadway"
                ], 
                "coordinate": {
                    "latitude": 40.794285621, 
                    "longitude": -73.9723531252
                }, 
                "state_code": "NY"
            }
        }, 
        {
            "is_claimed": true, 
            "rating": 3.0, 
            "mobile_url": "http://m.yelp.com/biz/v-and-t-pizzeria-and-restaurant-new-york", 
            "rating_img_url": "http://s3-media3.fl.yelpcdn.com/assets/2/www/img/34bc8086841c/ico/stars/v1/stars_3.png", 
            "review_count": 210, 
            "name": "V & T Pizzeria & Restaurant", 
            "rating_img_url_small": "http://s3-media3.fl.yelpcdn.com/assets/2/www/img/902abeed0983/ico/stars/v1/stars_small_3.png", 
            "url": "http://www.yelp.com/biz/v-and-t-pizzeria-and-restaurant-new-york", 
            "categories": [
                [
                    "Pizza", 
                    "pizza"
                ], 
                [
                    "Italian", 
                    "italian"
                ]
            ], 
            "phone": "2126631708", 
            "snippet_text": "This is one of the last remaining family style restaurants in NYC. Incredible real pizza, old time waiters. It's a relaxing atmosphere.  \nReasonably priced....", 
            "image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/NtPMOIUEPCmWoSq5zfIMHw/ms.jpg", 
            "snippet_image_url": "http://s3-media4.fl.yelpcdn.com/photo/xJhSEH8Zpt_704zydeiReA/ms.jpg", 
            "display_phone": "+1-212-663-1708", 
            "rating_img_url_large": "http://s3-media1.fl.yelpcdn.com/assets/2/www/img/e8b5b79d37ed/ico/stars/v1/stars_large_3.png", 
            "id": "v-and-t-pizzeria-and-restaurant-new-york", 
            "is_closed": false, 
            "location": {
                "cross_streets": "Cathedral Pky & 111th St", 
                "city": "New York", 
                "display_address": [
                    "1024 Amsterdam Ave", 
                    "Morningside Heights", 
                    "New York, NY 10025"
                ], 
                "geo_accuracy": 8.0, 
                "neighborhoods": [
                    "Morningside Heights"
                ], 
                "postal_code": "10025", 
                "country_code": "US", 
                "address": [
                    "1024 Amsterdam Ave"
                ], 
                "coordinate": {
                    "latitude": 40.8033524, 
                    "longitude": -73.9637756
                }, 
                "state_code": "NY"
            }
        }
    ]
};

// Development tasks
// --------------------------------------------------------------

// Live reload business.
gulp.task('reload', function () {
    livereload.reload();
});

gulp.task('seed', function(){
  var db = require('./server/db');
  var Transformation;
  db.then(function(){
    Transformation = mongoose.model('Transformation');
    return Transformation.remove();
  })
  .then(function(){
    var transformations = [
      {
        name: 'Yelp Search',
        input: JSON.stringify(yelpJson),
        transformer: 'return input.businesses.map(function(item) {return {name: item.name,rating: item.rating};});',
        shared: true,
        description: 'Returns rating and name of business.'
      },
      {
        name: 'Foo Bar',
        input: JSON.stringify([{
          name: 'Foo',
          id: 1
        
        }, {
          name: 'Bar',
          id: 2
        }]),
        transformer: 'return input.map(function(item){ return item.id; });',
        shared: true,
        description: 'Returns an array of ids'
      },
      {
        name: 'Bizz Buzz',
        input: JSON.stringify([{
          name: 'Bizz',
          id: 1
        
        }, {
          name: 'Buzz',
          id: 2
        }]),
        shared: true,
        transformer: 'return input.map(function(item){ return { firstLetter: item.name.substring(0, 2) } });',
        description: 'Transforms input to return object for each item.'
      }
    ];
    return Transformation.create(transformations);
  })
  .then(function(data){
    console.log(data);
    mongoose.disconnect();
  });

});

gulp.task('reloadCSS', function () {
    return gulp.src('./public/style.css').pipe(livereload());
});

gulp.task('lintJS', function () {

    return gulp.src(['./browser/js/**/*.js', './server/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());

});

var browserify = require('gulp-browserify');
 
// Basic usage 
gulp.task('browserify', function() {
    // Single entry point to browserify 
    gulp.src('b.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./public/'));
});


gulp.task('buildJS', ['lintJS', 'browserify'], function () {
    return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public'));
});

gulp.task('testServerJS', function () {
    require('babel/register');
	return gulp.src('./tests/server/**/*.js', {
		read: false
	}).pipe(mocha({ reporter: 'spec' }));
});

gulp.task('testServerJSWithCoverage', function (done) {
    gulp.src('./server/**/*.js')
        .pipe(istanbul({
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src('./tests/server/**/*.js', {read: false})
                .pipe(mocha({reporter: 'spec'}))
                .pipe(istanbul.writeReports({
                    dir: './coverage/server/',
                    reporters: ['html', 'text']
                }))
                .on('end', done);
        });
});

gulp.task('testBrowserJS', function (done) {
    karma.start({
        configFile: __dirname + '/tests/browser/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('buildCSS', function () {
    return gulp.src('./browser/scss/main.scss')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./public'));
});

gulp.task('seedDB', function () {

    var users = [
        { email: 'testing@fsa.com', password: 'testing123' },
        { email: 'joe@fsa.com', password: 'rainbowkicks' },
        { email: 'obama@gmail.com', password: 'potus' }
    ];

    var dbConnected = require('./server/db');

    return dbConnected.then(function () {
        var User = require('mongoose').model('User');
        return User.create(users);
    }).then(function () {
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
    });

});

// --------------------------------------------------------------

// Production tasks
// --------------------------------------------------------------

gulp.task('buildCSSProduction', function () {
    return gulp.src('./browser/scss/main.scss')
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public'));
});

gulp.task('buildJSProduction', ['browserify'], function () {
    return gulp.src(['./browser/js/app.js', './browser/js/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});

gulp.task('buildProduction', ['buildCSSProduction', 'buildJSProduction']);

// --------------------------------------------------------------

// Composed tasks
// --------------------------------------------------------------

gulp.task('build', function () {
    if (process.env.NODE_ENV === 'production') {
        runSeq(['buildJSProduction', 'buildCSSProduction']);
    } else {
        runSeq(['buildJS', 'buildCSS']);
    }
});

gulp.task('default', function () {

    livereload.listen();
    gulp.start('build');

    gulp.watch('browser/js/**', function () {
        runSeq('buildJS', 'reload');
    });

    gulp.watch('browser/scss/**', function () {
        runSeq('buildCSS', 'reloadCSS');
    });

    gulp.watch('server/**/*.js', ['lintJS']);

    // Reload when a template (.html) file changes.
    gulp.watch(['browser/**/*.html', 'server/app/views/*.html'], ['reload']);

    // Run server tests when a server file or server test file changes.
    gulp.watch(['tests/server/**/*.js'], ['testServerJS']);

    // Run browser testing when a browser test file changes.
    gulp.watch('tests/browser/**/*', ['testBrowserJS']);

});
