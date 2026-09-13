CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL DEFAULT 'user',
  password VARCHAR(255) NOT NULL,
  remember_token VARCHAR(100) NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  PRIMARY KEY (id), UNIQUE KEY users_email_unique (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NULL,
  PRIMARY KEY (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO users (name, email, role, password, created_at, updated_at)
VALUES ('Full Bright Admin', 'admin@fullbrightindonesia.com', 'admin', '$2y$12$1BiXQ7Sm7zJVQ2t11D3ChOnOQ0dPirP2s55OQ0sPFOuP2qSz.yQA.', NOW(), NOW());

CREATE TABLE IF NOT EXISTS analytics_sessions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  session_id VARCHAR(255) NOT NULL,
  visitor_id CHAR(36) NULL,
  landing_source VARCHAR(255) NULL,
  referral_source VARCHAR(2048) NULL,
  device_type VARCHAR(32) NULL,
  browser VARCHAR(64) NULL,
  os VARCHAR(64) NULL,
  duration_seconds INT UNSIGNED NOT NULL DEFAULT 0,
  max_scroll_depth TINYINT UNSIGNED NOT NULL DEFAULT 0,
  is_engaged TINYINT(1) NOT NULL DEFAULT 0,
  is_bounce TINYINT(1) NOT NULL DEFAULT 1,
  started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_seen_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id), UNIQUE KEY analytics_sessions_session_id_unique (session_id),
  KEY analytics_sessions_visitor_id_index (visitor_id), KEY analytics_sessions_landing_source_index (landing_source), KEY analytics_sessions_started_at_index (started_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS user_analytics (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  session_id VARCHAR(255) NOT NULL,
  visitor_id CHAR(36) NULL,
  event_type VARCHAR(64) NOT NULL,
  event_data JSON NOT NULL,
  referral_source VARCHAR(2048) NULL,
  utm_source VARCHAR(255) NULL, utm_medium VARCHAR(255) NULL, utm_campaign VARCHAR(255) NULL, utm_content VARCHAR(255) NULL, utm_term VARCHAR(255) NULL,
  ip_hash VARCHAR(64) NULL, user_agent VARCHAR(1024) NULL, user_id BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  landing_source VARCHAR(255) GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(event_data, '$.landing_source'))) STORED,
  scroll_depth TINYINT UNSIGNED GENERATED ALWAYS AS (CAST(JSON_UNQUOTE(JSON_EXTRACT(event_data, '$.depth')) AS UNSIGNED)) STORED,
  section_id VARCHAR(255) GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(event_data, '$.section'))) STORED,
  cta_zone VARCHAR(64) GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(event_data, '$.zone'))) STORED,
  cta_action VARCHAR(64) GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(event_data, '$.action'))) STORED,
  payment_status VARCHAR(64) GENERATED ALWAYS AS (JSON_UNQUOTE(JSON_EXTRACT(event_data, '$.status'))) STORED,
  payment_amount BIGINT UNSIGNED GENERATED ALWAYS AS (CAST(JSON_UNQUOTE(JSON_EXTRACT(event_data, '$.amount')) AS UNSIGNED)) STORED,
  PRIMARY KEY (id), KEY user_analytics_session_id_index (session_id), KEY user_analytics_visitor_id_index (visitor_id), KEY user_analytics_event_type_index (event_type), KEY user_analytics_created_at_index (created_at),
  KEY analytics_type_created_idx (event_type, created_at), KEY analytics_landing_source_idx (landing_source), KEY analytics_scroll_depth_idx (scroll_depth), KEY analytics_section_id_idx (section_id), KEY analytics_cta_action_idx (cta_action), KEY analytics_payment_status_idx (payment_status), KEY analytics_payment_amount_idx (payment_amount), KEY analytics_type_zone_idx (event_type, cta_zone),
  CONSTRAINT user_analytics_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
