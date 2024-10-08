CREATE TABLE quimicos (
  no_ INTEGER PRIMARY KEY AUTOINCREMENT,
  folio INTEGER,
  code TEXT,
  description TEXT,
  quantity INTEGER,
  uom TEXT,
  alias INTEGER,
  line TEXT,
  team TEXT,
  request_date DATE,
  requester TEXT,
  authorized TEXT,
  currency TEXT,
  unit_price INTEGER,
  total_price INTEGER,
  month_  TEXT
);

CREATE TABLE quimicos_catalogo (
  code TEXT PRIMARY KEY,
  description TEXT,
  price INTEGER,
  currency TEXT,
  uom TEXT
);

CREATE TABLE quimicos_equipos (
  line TEXT PRIMARY KEY,
  alias INTEGER,
  team INTEGER
);

CREATE TRIGGER update_description AFTER INSERT ON quimicos
BEGIN
  UPDATE quimicos
  SET description = (SELECT description FROM quimicos_catalogo WHERE code = NEW.code)
  WHERE rowid = NEW.rowid;
END;



CREATE TRIGGER update_uom AFTER INSERT ON quimicos
BEGIN
  UPDATE quimicos
  SET uom = (SELECT uom FROM quimicos_catalogo WHERE code = NEW.code)
  WHERE rowid = NEW.rowid;
END;



CREATE TRIGGER update_currency AFTER INSERT ON quimicos
BEGIN
  UPDATE quimicos
  SET currency = (SELECT currency FROM quimicos_catalogo WHERE code = NEW.code)
  WHERE rowid = NEW.rowid;
END;



CREATE TRIGGER update_price AFTER INSERT ON quimicos
BEGIN
  UPDATE quimicos
  SET unit_price = (SELECT price FROM quimicos_catalogo WHERE code = NEW.code)
  WHERE rowid = NEW.rowid;
END;



CREATE TRIGGER update_month AFTER INSERT ON quimicos
BEGIN
    UPDATE quimicos
    SET month_ = substr(new.request_date, 6, 2)
    WHERE rowid = new.rowid;
END;



CREATE TRIGGER update_alias AFTER INSERT ON quimicos
BEGIN
  UPDATE quimicos
  SET alias = (SELECT alias FROM quimicos_equipos WHERE line = NEW.line)
  WHERE rowid = NEW.rowid;
END;



CREATE TRIGGER update_team AFTER INSERT ON quimicos
BEGIN
  UPDATE quimicos
  SET team = (SELECT team FROM quimicos_equipos WHERE line = NEW.line)
  WHERE rowid = NEW.rowid;
END;



CREATE TRIGGER update_total_price AFTER INSERT ON quimicos
BEGIN
  UPDATE quimicos
  SET total_price = CASE
    WHEN (SELECT currency FROM quimicos_catalogo WHERE code = NEW.code) = 'MXN' THEN 
      ROUND(quantity * (SELECT price FROM quimicos_catalogo WHERE code = NEW.code) / 19, 2)
    WHEN (SELECT currency FROM quimicos_catalogo WHERE code = NEW.code) = 'USD' THEN 
      ROUND(quantity * (SELECT price FROM quimicos_catalogo WHERE code = NEW.code), 2)
    ELSE NULL
  END
  WHERE rowid = new.rowid;
END;