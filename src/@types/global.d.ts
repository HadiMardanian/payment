namespace NodeJS {
    interface ProcessEnv {
        PORT: string;

        CALLBACK_URL: string;
        MERCHANT_ID: string;
        MAX_PAYMENT_LIMIT: string;

        SHEPA_URL: string;
        SHEPA_APIKEY: "sandbox";

        ZARINPAL_URL: string;
        ZARINPAL_TOKEN: string;

        MONGO_CONNECTION_STRING: string;
    }
}