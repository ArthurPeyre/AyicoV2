<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des données du formulaire
    $nomPrenom = $_POST['txtname'];
    $email = $_POST['txtemail'];
    $telephone = $_POST['txtphone'];
    $description = $_POST['txtdesc'];
    
    // Construction du message
    $message = "$nomPrenom\n";
    $message .= "$email\n";
    $message .= "$telephone\n";
    $message .= "$siteWeb\n";
    $message .= "\n$description\n";
    
    // Envoi du mail
    $destinataire = "hello@ayico.fr";
    $sujet = "Nouvelle demande de projet";
    $headers = "From: $nomPrenom\r\nReply-To: $email";
    
    // Envoi du mail
    if (mail($destinataire, $sujet, $message, $headers)) {
        echo "Votre demande a été envoyée avec succès.";
    } else {
        echo "Une erreur est survenue lors de l'envoi de votre demande.";
    }
}
header('Location: ./index.html');
?>
