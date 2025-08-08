<?php
$conn = new mysqli("localhost", "root", "", "gestion_individus");

if ($conn->connect_error) {
    die("Erreur de connexion : " . $conn->connect_error);
}

$action = $_GET['action'] ?? null;

if ($action == 'add_individu') {
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $date_naissance = $_POST['date_naissance'];
    $sexe_id = $_POST['sexe_id'];
    $region_id = $_POST['region_id'];

    $conn->query("INSERT INTO individus (nom, prenom, date_naissance, sexe_id, region_id) 
                  VALUES ('$nom', '$prenom', '$date_naissance', $sexe_id, $region_id)");
}elseif ($action == 'add_region') {
    $nom = $_POST['nom'];
   
    $conn->query("INSERT INTO region (nom) 
                  VALUES ('$nom')");
}elseif ($action == 'add_sexe') {
                    $label = $_POST['label'];
                   
                    $conn->query("INSERT INTO sexe (label) 
                                  VALUES ('$label')");
}elseif ($action == 'update_individu') {
    $id = $_POST['id'];
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $date_naissance = $_POST['date_naissance'];
    $sexe_id = $_POST['sexe_id'];
    $region_id = $_POST['region_id'];

    $conn->query("UPDATE individus SET 
                  nom = '$nom', 
                  prenom = '$prenom', 
                  date_naissance = '$date_naissance', 
                  sexe_id = $sexe_id, 
                  region_id = $region_id 
                  WHERE id = $id");
} elseif ($action == 'delete_individu') {
    $id = $_POST['id'];
    $conn->query("DELETE FROM individus WHERE id = $id");
} elseif ($action == 'get_options') {
    $sexes = $conn->query("SELECT * FROM sexe")->fetch_all(MYSQLI_ASSOC);
    $regions = $conn->query("SELECT * FROM region")->fetch_all(MYSQLI_ASSOC);
    echo json_encode(['sexes' => $sexes, 'regions' => $regions]);
} elseif ($action == 'get_individus') {
    $result = $conn->query("
        SELECT individus.id, individus.nom, individus.prenom, individus.date_naissance, 
               sexe.label AS sexe, region.nom AS region, individus.date_ajout 
        FROM individus
        JOIN sexe ON individus.sexe_id = sexe.id
        JOIN region ON individus.region_id = region.id
    ");
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
            <td>{$row['nom']}</td>
            <td>{$row['prenom']}</td>
            <td>{$row['date_naissance']}</td>
            <td>{$row['sexe']}</td>
            <td>{$row['region']}</td>
            <td>{$row['date_ajout']}</td>
            <td>
                <button class='edit-btn' data-id='{$row['id']}'>Modifier</button>
                <button class='delete-btn' data-id='{$row['id']}'>Supprimer</button>
            </td>
        </tr>";
    }
}

$conn->close();
