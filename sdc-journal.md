## Support CRUD from your API
________________________________
## Extend the existing API to support all CRUD operations. This should be done with the inherited DBMS.

## CRUD:
  * POST
  * GET
  * PUT
  * DELETE

_____________________________________________________________

### POST: */new/review*
```
{
  "id":10101,
  "name":"Maeve Leffler",
  "reviews":[
    {
      "_id":"5ebb6de02ac55e0e7b5a1c41", //OBJECT ID
      "username":"Ayana Luettgen",
      "date":"June 2020",
      "text":"Nulla est et labore cumque quis non. Animi harum ex numquam. Recusandae reiciendis deleniti aut est ducimus excepturi.",
      "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/surgeonist/128.jpg",
      "scores":[
        {
          "_id":"5ebb6de02ac55e0e7b5a1c42", //OBJECT ID
          "cleanliness":2.4,
          "communication":4.4,
          "checkin":3.8,
          "accuracy":2.5,
          "location":4.5,
          "value":4.4
        }
      ]
    }
  ]
}
```

### GET: */:listId* : 10086
```
{
  "id":10086,
  "name":"Solidstate_Bandwidth_Nextgeneration_house",
  "reviews":[
    {
      "_id":"5ebb66e89475980c9cde64ba", //OBJECT ID
      "username":"Jessy Hammes",
      "date":"September 2018",
      "text":"Possimus omnis et voluptatem. Quas consequatur at sunt reiciendis labore. Sequi velit atque ut ut odio repudiandae asperiores. Inventore et est consequatur vero deserunt. Maiores dignissimos quae repellendus eveniet recusandae.",
      "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/thekevinjones/128.jpg",
      "scores":[
        {
          "_id":"5ebb66e89475980c9cde64bd", //OBJECT ID
          "cleanliness":3.6,
          "communication":1.7,
          "checkin":1,
          "accuracy":0.2,
          "location":0.8,
          "value":0.8
        }
      ]
    }
  ]
}
```

### UPDATE: *update/:listingId*

```
{
  "id":10045,
  "name":"vel impedit sunt",
  "reviews":[
    {
      "_id":"5ebe014db496df0a065abc33",
      "username":"Edwin Homenick",
      "date":"July 2019",
      "text":"Molestias modi totam. Inventore perspiciatis qui quos aut. Sed soluta odit quia non ut beatae dignissimos. Et tenetur ut.
      "avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/brandonburke/128.jpg",
      "scores":[
        {
          "_id":"5ebe014db496df0a065abc34",
          "cleanliness":4.1,
          "communication":3.8,"checkin":0,
          "accuracy":3.7,
          "location":3.7,
          "value":1
        }
      ]
    }
  ]
}
```

### DELETE: */delete/:listingId*
```
Successful delete.

State: []
```
