CREATE TRIGGER update_tracking_0
AFTER UPDATE OF requisition, po, status
ON pedidos_especiales
WHEN NEW.requisition = 0 AND NEW.po = 0 AND (NEW.status = 'En tiempo' OR NEW.status = 'Vencido')
BEGIN
  UPDATE pedidos_especiales
  SET tracking = 'Sin requisicion'
  WHERE requisition = 0 AND po = 0 AND (status = 'En tiempo' OR status = 'Vencido');
END;



CREATE TRIGGER update_tracking_1
AFTER UPDATE OF requisition, po, status
ON pedidos_especiales
WHEN NEW.requisition > 1 AND NEW.po = 0 AND (NEW.status = 'En tiempo' OR NEW.status = 'Vencido')
BEGIN
  UPDATE pedidos_especiales
  SET tracking = 'Con requisicion'
  WHERE requisition > 1 AND po = 0 AND (status = 'En tiempo' OR status = 'Vencido');
END;



CREATE TRIGGER update_tracking_2
AFTER UPDATE OF po, status
ON pedidos_especiales
WHEN NEW.po > 1 AND (NEW.status = 'En tiempo' OR NEW.status = 'Vencido')
BEGIN
  UPDATE pedidos_especiales
  SET tracking = 'Con PO'
  WHERE po > 1 AND (status = 'En tiempo' OR status = 'Vencido');
END;



CREATE TRIGGER update_tracking_3
AFTER UPDATE OF progress
ON pedidos_especiales
WHEN NEW.progress > 99
BEGIN
  UPDATE pedidos_especiales
  SET tracking = 'Cerrado'
  WHERE progress > 99;
END;



CREATE TRIGGER update_status_0
AFTER UPDATE OF progress
ON pedidos_especiales
WHEN NEW.progress > 99
BEGIN
  UPDATE pedidos_especiales
  SET status = 'Cerrado'
  WHERE progress > 99;
END;



CREATE TRIGGER update_status_1
AFTER UPDATE OF arrived_date, progress
ON pedidos_especiales
WHEN NEW.arrived_date > datetime('now') AND NEW.progress < 100
BEGIN
  UPDATE pedidos_especiales
  SET status = 'En tiempo'
  WHERE arrived_date > datetime('now') AND progress < 100;
END;



CREATE TRIGGER update_status_2
AFTER UPDATE OF arrived_date, progress
ON pedidos_especiales
WHEN NEW.arrived_date < datetime('now') AND NEW.progress < 100
BEGIN
  UPDATE pedidos_especiales
  SET status = 'Vencido'
  WHERE arrived_date < datetime('now') AND progress < 100;
END;