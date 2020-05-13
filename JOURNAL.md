App of choice: Airbnb

Service: Reviews

Phase 1: Scale the Database: Support CRUD from your API

As a user of Airbnb, my reviews should have access to the following APIs

POST : ‘reviews/:listingId’ - to post a review to that listing

POST : '/users' - to create a user account

GET : ‘/reviews’ - to retrieve all reviews

GET : ‘reviews/:listingId’ - to retrieve all the reviews for that listing id

GET : ‘reviews/users/:userId’ - to retrieve all the reviews for all the listings of that user id & reviews that user has left on other listings

UPDATE : ‘reviews/:listingId/:reviewId’ - If I am a user, and want to update a review I posted, I would want to access a specific listing, and update the review I posted on that listing. Therefore this review would be updated by accessing that :listingId and updating that :reviewId.

AIRBNB DOES NOT ALLOW USERS TO EDIT REVIEWS AFTER POSTING.

DELETE : ‘/reviews/:listingId/:reviewId’ - If I am a user and want to delete a review I’ve posted on a listing, I would need to access that listing ( /:listingId ) and review ( /:reviewId ) and delete that review from that listing.

AIRBNB DOES NOT ALLOW USERS TO REMOVE REVIEWS AFTER POSTING.


