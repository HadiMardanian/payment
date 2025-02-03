---
title: payment project
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.23"

---

# payment project

Base URLs:

* <a href="http://localhost:3000">develop: http://localhost:3000</a>

# Authentication

# Default

## POST Payment Request

POST /payment/request

> Body Parameters

```json
{
  "invoiceId": "string",
  "gateway": "zarinpal",
  "amount": 0,
  "description": "string",
  "mobile": "string",
  "email": "string"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» invoiceId|body|string| yes |none|
|» gateway|body|string¦null| yes |none|
|» amount|body|integer| yes |none|
|» description|body|string| yes |none|
|» mobile|body|string¦null| yes |none|
|» email|body|string¦null| yes |none|

#### Enum

|Name|Value|
|---|---|
|» gateway|zarinpal|
|» gateway|shepa|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Create Invoice

POST /invoice/create

> Body Parameters

```json
{
  "totalAmount": 0,
  "title": "string",
  "mobile": "string",
  "email": "string"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» totalAmount|body|integer| yes |none|
|» title|body|string| yes |none|
|» mobile|body|string¦null| yes |none|
|» email|body|string¦null| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET Get Payment Status

GET /payment/status

> Body Parameters

```json
{}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|paymentId|query|string| no |none|
|body|body|object| no |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET Get Invoice Info

GET /invoice/getInfo

> Body Parameters

```json
{}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|invoiceId|query|string| no |none|
|body|body|object| no |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Reverse Payment

POST /payment/refund

> Body Parameters

```json
{
  "authority": "string",
  "invoiceId": "string"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» authority|body|string| yes |none|
|» invoiceId|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Get Waiting Payments

POST /invoice/getWaitingPayments

> Body Parameters

```json
{
  "invoiceId": "string"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» invoiceId|body|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## POST Start Waiting Payment

POST /payment/startWaiting

> Body Parameters

```json
{
  "paymentId": "string",
  "gateway": "zarinpal"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» paymentId|body|string| yes |none|
|» gateway|body|string| yes |none|

#### Enum

|Name|Value|
|---|---|
|» gateway|zarinpal|
|» gateway|shepa|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET Ready To Pay

GET /payment/readyToPay

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|token|query|string| yes |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# Admin

## POST Create Ready To Pay Link

POST /admin/payment/getReadyToPayLink

> Body Parameters

```json
{
  "amount": 0,
  "description": "string",
  "userFullName": "string",
  "mobile": "string",
  "readyToPayGateway": "string"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|
|» amount|body|integer| no |none|
|» description|body|string| no |none|
|» userFullName|body|string| yes |none|
|» mobile|body|string| yes |none|
|» readyToPayGateway|body|string| no |none|

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

## GET Get All Payments Status

GET /admin/payment/allPaymentsStatus

> Response Examples

> 200 Response

```json
{}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

# Data Schema

