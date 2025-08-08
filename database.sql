CREATE DATABASE gestion_individus;

USE gestion_individus;

CREATE TABLE sexe (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(50) NOT NULL
);

CREATE TABLE region (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE individus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    date_naissance DATE NOT NULL,
    sexe_id INT NOT NULL,
    region_id INT NOT NULL,
    date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sexe_id) REFERENCES sexe(id),
    FOREIGN KEY (region_id) REFERENCES region(id)
);
