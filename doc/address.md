# Address API Spec

## Create Address

Endpoint : POST /api/contacts/{idContact}/addresses

Request Header :
- Authorization : token

Request Body :

```json
{
  "street" : "jalan",
  "city" : "kota",
  "province" : "provinsi",
  "country" : "negara",
  "postal_code" : "234234"
}
```

Response Body :

```json
{
  "data" : {
    "id" : 1,
    "street" : "jalan",
    "city" : "kota",
    "province" : "provinsi",
    "country" : "negara",
    "postal_code" : "234234"
  }
}
```

## Get Address

Endpoint : GET /api/contacts/{idContact}/addresses/{idAddress}

Request Header :
- Authorization : token

Response Body :

```json
{
  "data" : {
    "id" : 1,
    "street" : "jalan",
    "city" : "kota",
    "province" : "provinsi",
    "country" : "negara",
    "postal_code" : "234234"
  }
}
```

## Update Address

Endpoint : PUT /api/contacts/{idContact}/addresses/{idAddress}

Request Header :
- Authorization : token

Request Body :

```json
{
  "street" : "jalan",
  "city" : "kota",
  "province" : "provinsi",
  "country" : "negara",
  "postal_code" : "234234"
}
```

Response Body :

```json
{
  "data" : {
    "id" : 1,
    "street" : "jalan",
    "city" : "kota",
    "province" : "provinsi",
    "country" : "negara",
    "postal_code" : "234234"
  }
}
```

## Remove Address

Endpoint : DELETE /api/contacts/{idContact}/addresses/{idAddress}

Request Header :
- Authorization : token

Response Body :

```json
{
  "data": true
}
```

## List Address

Endpoint : GET /api/contacts/{idContact}/addresses

Request Header :
- Authorization : token

Response Body :

```json
{
  "data": [
    {
      "id": 1,
      "street": "jalan",
      "city": "kota",
      "province": "provinsi",
      "country": "negara",
      "postal_code": "234234"
    },
    {
      "id": 2,
      "street": "jalan",
      "city": "kota",
      "province": "provinsi",
      "country": "negara",
      "postal_code": "234234"
    }
  ]
}
```
