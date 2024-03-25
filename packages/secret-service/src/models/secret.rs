use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize)]
pub struct Secret {
    pub id: Uuid,
    #[serde(rename = "appName")]
    pub app_name: String,
    #[serde(skip_serializing)]
    pub secret: String,
    #[serde(skip_serializing)]
    pub active: bool,
    pub expires_at: NaiveDateTime,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Debug, Deserialize)]
pub struct NewSecret {
    #[validate(length(min = 3, max = 30))]
    #[serde(rename = "appName")]
    pub app_name: String,
    #[validate(length(min = 4, max = 255))]
    pub secret: String,
    pub expires_at: NaiveDateTime,
}

#[derive(Debug, Deserialize)]
pub struct InactiveSecret {
    #[validate(required)]
    pub id: Uuid,
    pub active: bool,
}

#[derive(Debug, Deserialize)]
pub struct ActiveSecret {
    #[validate(required)]
    pub id: Uuid,
    pub active: bool,
}

#[derive(Debug, Deserialize)]
pub struct UpdateExpiresAt {
    #[validate(required)]
    pub id: Uuid,
    pub expires_at: NaiveDateTime,
}

#[derive(Debug, Deserialize)]
pub struct DeleteSecret {
    #[validate(required)]
    pub id: Uuid,
}