
# Project Design Documentation

## Data Models

### Overview
This section describes the data models used in the application. Each model represents a collection in MongoDB and is defined using Mongoose.

---

### Invoice Model

#### Description
The `Invoice` model represents an invoice in the system. It tracks details such as the total amount, payments, and status of the invoice. It also includes optional fields for customer information and payment processing.

#### Fields
| Field Name            | Type               | Required | Default Value | Validation Rules | Description                                      |
|-----------------------|--------------------|----------|---------------|------------------|--------------------------------------------------|
| `title`               | `string`           | Yes      | -             | -                | The title of the invoice.                        |
| `totalAmount`         | `number`           | Yes      | -             | -                | The total amount of the invoice.                 |
| `previousTotalAmount` | `number`           | No       | -             | -                | The previous total amount (if applicable).       |
| `mobile`              | `string`           | No       | -             | -                | The mobile number of the customer.               |
| `email`               | `string`           | No       | -             | -                | The email address of the customer.               |
| `payments`            | `Payment[]`        | No       | -             | -                | A list of payments associated with the invoice.  |
| `isDone`              | `boolean`          | No       | -             | -                | Indicates if the invoice is completed.           |
| `readyToPayToken`     | `string`           | No       | -             | -                | A token for ready-to-pay processing.             |
| `userFullName`        | `string`           | No       | -             | -                | The full name of the user.                       |
| `description`         | `string`           | No       | -             | -                | A description of the invoice.                    |
| `unlimitAmount`       | `boolean`          | No       | -             | -                | Indicates if the invoice amount is unlimited.    |
| `readyAmount`         | `number`           | No       | -             | -                | The amount ready for payment.                    |
| `readyToPayGateway`   | `string`           | No       | -             | -                | The gateway used for ready-to-pay processing.    |

#### Indexes
- **Timestamps**: Automatically managed by Mongoose (`createdAt` and `updatedAt`).

#### Relationships
- **One-to-Many**: Each `Invoice` can have multiple `Payment` records.
- **Related Model**: `Payment`
- **Description**: Payments associated with the invoice are stored in the `payments` array.

---

### Payment Model

#### Description
The `Payment` model represents a payment transaction in the system. It tracks details such as the payment gateway, amount, status, and customer information.

#### Fields
| Field Name            | Type               | Required | Default Value | Validation Rules | Description                                      |
|-----------------------|--------------------|----------|---------------|------------------|--------------------------------------------------|
| `gateway`             | `string`           | Yes      | -             | Enum: `["zarinpal", "shepa", "zibal"]` | The payment gateway used. |
| `authority`           | `string`           | Yes      | -             | -                | The payment authority ID.                        |
| `amount`              | `number`           | Yes      | -             | -                | The amount of the payment.                       |
| `description`         | `string`           | Yes      | -             | -                | A description of the payment.                    |
| `mobile`              | `string`           | No       | -             | -                | The mobile number of the customer.               |
| `email`               | `string`           | No       | -             | -                | The email address of the customer.               |
| `status`              | `string`           | Yes      | -             | Enum: `["pending", "failed", "success", "canceled", "reversed", "waiting"]` | The status of the payment. |
| `paymentFinalizedDate`| `Date`             | No       | -             | -                | The date when the payment was finalized.         |
| `cardNumber`          | `string`           | No       | -             | -                | The card number used for the payment.            |

#### Indexes
- **Timestamps**: Automatically managed by Mongoose (`createdAt` and `updatedAt`).

#### Relationships
- **Many-to-One**: Each `Payment` belongs to an `Invoice`.
- **Related Model**: `Invoice`
- **Description**: Payments are linked to an invoice via the `payments` array in the `Invoice` model.

---
