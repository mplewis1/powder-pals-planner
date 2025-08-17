-- White Peak Ski Trips Database Schema

-- Bookings table - Main booking records
CREATE TABLE bookings (
    id VARCHAR(50) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('pending', 'in_progress', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    
    -- Client Information
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50),
    
    -- Group Details
    number_of_people INT NOT NULL,
    number_of_rooms INT,
    has_minors BOOLEAN DEFAULT FALSE,
    
    -- Travel Details
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    specific_locations TEXT,
    
    -- Budget Information
    budget_range VARCHAR(100),
    budget_details TEXT,
    
    -- Preferences
    past_experiences TEXT,
    preferred_hotels TEXT,
    special_requirements TEXT,
    
    -- Metadata
    assigned_agent VARCHAR(100),
    notes TEXT,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium'
);

-- Minor ages table - For storing ages of minors
CREATE TABLE booking_minor_ages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- Selected resorts table - For storing selected resorts
CREATE TABLE booking_selected_resorts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(50) NOT NULL,
    resort_name VARCHAR(255) NOT NULL,
    region VARCHAR(100),
    country VARCHAR(100),
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- Interests table - For storing selected interests
CREATE TABLE booking_interests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(50) NOT NULL,
    interest VARCHAR(100) NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- Booking history table - For tracking status changes
CREATE TABLE booking_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id VARCHAR(50) NOT NULL,
    status_from ENUM('pending', 'in_progress', 'confirmed', 'cancelled', 'completed'),
    status_to ENUM('pending', 'in_progress', 'confirmed', 'cancelled', 'completed'),
    changed_by VARCHAR(100),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- Agents table - For managing travel agents
CREATE TABLE agents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);
CREATE INDEX idx_bookings_client_email ON bookings(client_email);
CREATE INDEX idx_bookings_start_date ON bookings(start_date);
CREATE INDEX idx_booking_resorts_booking_id ON booking_selected_resorts(booking_id);
CREATE INDEX idx_booking_interests_booking_id ON booking_interests(booking_id);

-- Sample queries for common operations:

-- 1. Get all pending bookings with resort details
/*
SELECT 
    b.*,
    GROUP_CONCAT(DISTINCT br.resort_name) as selected_resorts,
    GROUP_CONCAT(DISTINCT bi.interest) as interests
FROM bookings b
LEFT JOIN booking_selected_resorts br ON b.id = br.booking_id
LEFT JOIN booking_interests bi ON b.id = bi.booking_id
WHERE b.status = 'pending'
GROUP BY b.id
ORDER BY b.created_at DESC;
*/

-- 2. Get bookings by date range
/*
SELECT * FROM bookings 
WHERE start_date BETWEEN '2024-12-01' AND '2025-03-31'
ORDER BY start_date;
*/

-- 3. Get bookings by budget range
/*
SELECT * FROM bookings 
WHERE budget_range = '$10,000 - $15,000 per person'
ORDER BY created_at DESC;
*/

-- 4. Get bookings with minors
/*
SELECT b.*, GROUP_CONCAT(bma.age) as minor_ages
FROM bookings b
LEFT JOIN booking_minor_ages bma ON b.id = bma.booking_id
WHERE b.has_minors = TRUE
GROUP BY b.id;
*/
