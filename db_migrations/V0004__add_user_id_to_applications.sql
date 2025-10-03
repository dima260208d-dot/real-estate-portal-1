-- Добавляем поле user_id в таблицу applications для связи заявки с клиентом
ALTER TABLE applications ADD COLUMN IF NOT EXISTS user_id INTEGER;

-- Создаем индекс для быстрого поиска заявок по user_id
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);