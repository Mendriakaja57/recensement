
    $(document).ready(function () {
        function loadOptions() {
            $.get("api.php?action=get_options", function (response) {
                const data = JSON.parse(response);
                $("#sexe-select").empty().append('<option value="">-- Sélectionnez un Sexe --</option>');
                data.sexes.forEach(sexe => {
                    $("#sexe-select").append(`<option value="${sexe.id}">${sexe.label}</option>`);
                });
                $("#region-select").empty().append('<option value="">-- Sélectionnez une Région --</option>');
                data.regions.forEach(region => {
                    $("#region-select").append(`<option value="${region.id}">${region.nom}</option>`);
                });
            });
        }

        function loadIndividus() {
            $.get("api.php?action=get_individus", function (data) {
                $("#individus-table-body").html(data);
            });
        }

        loadOptions();
        loadIndividus();

        // Ajouter un individu
        $("#individu-form").submit(function (e) {
            e.preventDefault();
            const formData = $(this).serialize();
            $.post("api.php?action=add_individu", formData, function () {
                loadIndividus();
                $("#individu-form")[0].reset();
            });
        });

        // Supprimer un individu
        $(document).on("click", ".delete-btn", function () {
            const id = $(this).data("id");
            if (confirm("Êtes-vous sûr de vouloir supprimer cet individu ?")) {
                $.post("api.php?action=delete_individu", { id }, function () {
                    loadIndividus();
                });
            }
        });

        // Modifier un individu
        $(document).on("click", ".edit-btn", function () {
            const id = $(this).data("id");

            // Remplir le formulaire avec les informations de l'individu
            const row = $(this).closest("tr");
            const nom = row.find("td:nth-child(2)").text();
            const prenom = row.find("td:nth-child(3)").text();
            const date_naissance = row.find("td:nth-child(4)").text();
            const sexe = row.find("td:nth-child(5)").text();
            const region = row.find("td:nth-child(6)").text();

            $("#individu-form [name='nom']").val(nom);
            $("#individu-form [name='prenom']").val(prenom);
            $("#individu-form [name='date_naissance']").val(date_naissance);
        

            // Sélectionner les options correspondantes dans les listes déroulantes
            $("#sexe-select option").filter(function () {
                return $(this).text() === sexe;
            }).prop("selected", true);

            $("#region-select option").filter(function () {
                return $(this).text() === region;
            }).prop("selected", true);

            // Ajouter un champ caché pour l'ID
            if (!$("#individu-form [name='id']").length) {
                $("#individu-form").append('<input type="hidden" name="id" value="' + id + '">');
            } else {
                $("#individu-form [name='id']").val(id);
            }

            // Modifier l'action du formulaire pour "update"
            $("#individu-form").off("submit").submit(function (e) {
                e.preventDefault();
                const formData = $(this).serialize();
                $.post("api.php?action=update_individu", formData, function () {
                    loadIndividus();
                    $("#individu-form")[0].reset();
                    $("#individu-form [name='id']").remove();
                });

                // Réinitialiser l'action du formulaire
                $(this).off("submit").submit(function (e) {
                    e.preventDefault();
                    const formData = $(this).serialize();
                    $.post("api.php?action=add_individu", formData, function () {
                        loadIndividus();
                        $("#individu-form")[0].reset();
                    });
                });
            });
        });
    });

