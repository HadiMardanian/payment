namespace NodeJS {
    interface ProcessEnv {
        PORT: string;

        CALLBACK_URL: string;
        MERCHANT_ID: string;
        MAX_PAYMENT_LIMIT: string;
        READY_TO_PAY_LINK: string;
        READY_TO_PAY_DYNAMIC_LINK: string;
        DEFAULT_GATEWAY: "zarinpal" | "shepa";
        
        SHEPA_URL: string;
        SHEPA_APIKEY: string;

        ZARINPAL_URL: string;
        ZARINPAL_TOKEN: string;

        MONGO_CONNECTION_STRING: string;
    }
}