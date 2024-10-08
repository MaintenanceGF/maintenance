CREATE TABLE requisiciones (
  requisition INTEGER PRIMARY KEY,
  po INTEGER,
  status TEXT,
  line TEXT,
  description TEXT,
  supplier TEXT,
  requester TEXT,
  buyer TEXT,
  arrived_date DATE,
  tracking TEXT,
  progress INTEGER,
  delivery TEXT,
  note TEXT
);



CREATE TRIGGER update_tracking_4
AFTER UPDATE OF po, delivery
ON requisiciones
WHEN NEW.po < 1 AND (NEW.delivery = 'En tiempo' OR NEW.delivery = 'Vencido')
BEGIN
  UPDATE requisiciones
  SET tracking = 'Sin PO'
  WHERE po < 1 AND (delivery = 'En tiempo' OR delivery = 'Vencido');
END;



CREATE TRIGGER update_tracking_5
AFTER UPDATE OF po, delivery
ON requisiciones
WHEN NEW.po > 1 AND (NEW.delivery = 'En tiempo' OR NEW.delivery = 'Vencido')
BEGIN
  UPDATE requisiciones
  SET tracking = 'Con PO'
  WHERE po > 1 AND (delivery = 'En tiempo' OR delivery = 'Vencido');
END;



CREATE TRIGGER update_tracking_6
AFTER UPDATE OF progress
ON requisiciones
WHEN NEW.progress > 99
BEGIN
  UPDATE requisiciones
  SET tracking = 'Cerrado'
  WHERE progress > 99;
END;



CREATE TRIGGER update_status_3
AFTER UPDATE OF progress
ON requisiciones
WHEN NEW.progress > 99
BEGIN
  UPDATE requisiciones
  SET delivery = 'Cerrado'
  WHERE progress > 99;
END;



CREATE TRIGGER update_status_4
AFTER UPDATE OF arrived_date, progress
ON requisiciones
WHEN NEW.arrived_date > datetime('now') AND NEW.progress < 100
BEGIN
  UPDATE requisiciones
  SET delivery = 'En tiempo'
  WHERE arrived_date > datetime('now') AND progress < 100;
END;



CREATE TRIGGER update_status_5
AFTER UPDATE OF arrived_date, progress
ON requisiciones
WHEN NEW.arrived_date < datetime('now') AND NEW.progress < 100
BEGIN
  UPDATE requisiciones
  SET delivery = 'Vencido'
  WHERE arrived_date < datetime('now') AND progress < 100;
END;