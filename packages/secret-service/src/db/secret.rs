use crate::{
  models::secret::{NewSecret, ActiveSecret, InactiveSecret, DeleteSecret, UpdateExpiresAt, Secret},
};

pub struct SecretRepository {
  pool: Arc<PgPool>,
}

impl SecretRepository {
  pub fn new(pool: Arc<PgPool>) -> Self {
      Self { pool }
  }

  pub async fn create(&self, new_secret: NewSecret) -> Result<Secret> {
      //let password_hash = hashing.hash_password(new_user.password).await?;

      let se = sqlx::query_as::<_, User>(
          "insert into secrets (app_name, secret) values ($2) returning *",
      )
      .bind(new_user.secret)
      .fetch_one(&*self.pool)
      .await?;
      Ok(Secret)
  }
}