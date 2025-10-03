-- Удаляем старое ограничение на role
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;

-- Добавляем новое ограничение с поддержкой client
ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('admin', 'director', 'client'));