use argon2::{Variant, Version, ThreadMode};
use config::{Config, Environment, ConfigError};
use dotenv::dotenv;
use serde::Deserialize;
use sqlx::PgPool;

#[derive(Debug, Deserialize)]
pub struct ConfigService {
    pub host: String,
    pub port: i32,
    pub database_host: String,
    pub database_name: String,
    pub database_user: String,
    pub database_password: String,
    pub database_port: String,
    pub database_url: String,
}

impl ConfigService {
    pub fn from_env() -> Result<ConfigService, ConfigError> {
        dotenv().ok();
        let mut c = Config::new();
        c.merge(Environment::new())?;
        c.try_into()
    }

    /// Creates a connection pool to the PostgreSQL database specified in the configuration.
    // #[instrument(skip(self))]
    pub async fn db_pool(&self) -> Result<PgPool, sqlx::Error> {
        // info!("Creating database connection pool.");
        let database_url = format!(
            "{}{}:{}@{}:{}/{}",
            &self.database_url,
            &self.database_user,
            &self.database_password,
            &self.database_host,
            &self.database_port,
            &self.database_name
        );
        return PgPool::connect(&database_url)
            .await;
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::{process::{Command}};
    use crate::config::ConfigService;

    fn setup() -> Result<(), std::io::Error> {
        let output =Command::new("docker-compose")
            .arg("-f")
            .arg("docker-compose.test.yml")
            .arg("up")
            .arg("-d")
            .output()
            .expect("failed to start Docker container");
        println!("output: {:?}", output);
        Ok(())
    }

    fn teardown() -> Result<(), std::io::Error>  {
        let output = Command::new("docker-compose")
            .arg("-f")
            .arg("docker-compose.test.yml")
            .arg("down")
            .output()
            .expect("failed to stop Docker container");
        println!("output: {:?}", output);
        Ok(())
    }

    #[test]
    fn test_config_service_from_env() {
        let result = ConfigService::from_env();

        let config_service: ConfigService = result.unwrap();
        assert!(config_service.host.len() > 0);
        assert!(config_service.port > 0);
        assert!(config_service.database_name.len() > 0);
        assert!(config_service.database_user.len() > 0);
        assert!(config_service.database_password.len() > 0);
        assert!(config_service.database_port.len() > 0);
        assert!(config_service.database_url.len() > 0);
    }

    #[tokio::test]
    async fn test_config_service_db_pool() {
        // Start the Docker container
        setup().expect("failed to start Docker container");

        let config_service: ConfigService = ConfigService::from_env().unwrap();
        println!("config_service: {:?}", config_service);

        // Create a connection pool to the database
        #[cfg(feature = "rt-multi-thread")]
        let pool = config_service.db_pool().await.unwrap();

        #[cfg(feature = "rt-multi-thread")]
        let row = sqlx::query_as::<_, (i32,)>("SELECT 1")
            .fetch_one(&pool)
            .await
            .unwrap();
        // // Test that we can execute a query on the database
        #[cfg(feature = "rt-multi-thread")]
        assert_eq!(row.get::<_, i32>(0), 1);

        // Stop the Docker container
        teardown().expect("failed to stop Docker container");
    }
}