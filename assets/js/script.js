$(function () {
    function backgroundParallax(nbrPxScroll) {
        $('#wallpaper').css('top', -(nbrPxScroll * 0.25) + 'px');
    }

    /*GESTION DU SCROLL POUR LA NAV ET FOOTER
     Je cache le footer, je déclare la variable qui vas stocker la hauteur du header puis la varaible qui vas stoker le nbr de px que l'on a scroll
     Je lance une fonction avec l'évenement scroll, et on commence par stocker le nbr de px srcoll dans ça variable puis on en profite pour lancer ma fonction parallax du background
     Si le nbr de px du header est infèrieur au nombre de px scroll (donc le header n'est plus présent sur notre écran)
     Je passe la nav en fixed (pourqu'elle soit toujours présente en haut de l'écran), j'affiche le footer (toujour présent en bas de notre écran), puis je remonte les foramations (Pour éviter le déclage suite a la position fixed du header)
     Sinon (nbr de pc du header supérieur au nbr de px scroll donc header présent sur l'écran)
     Je passe la nav en static (elle sera collée au header), je cache le footer, et puis je désecend les foramations (Pour éviter le déclage suite a la position fixed du header)
     */
    $('#footer').css('display', 'none');
    var headerHeight = $('#navigation').offset().top;
    var navHeight = $('#navigation').height();
    var nbrPxScroll;
    $(window).scroll(function () {
        navHeight = $('#navigation').height();
        nbrPxScroll = $(this).scrollTop();
        backgroundParallax(nbrPxScroll);
        if (headerHeight < nbrPxScroll) {
            $('#navigation').css('position', 'fixed');
            $("#footer").slideDown("slow");
            $('#zoneFormation').css('margin-top', navHeight);
        } else {
            $('#navigation').css('position', 'static');
            $("#footer").slideUp("slow");
            $('#zoneFormation').css('margin-top', 0);    
        }
    });


    /*MENU DEROULANT DE LA NAV PHONE
     * Je commence par cacher la list et la flêche vers le haut
     * Lorsque je clique sur le boutton du menu déroulant
     * J'ouvre la liste et j'inverse les flêches
     * Si je reclique sur le bouton les toggle vont gérer eux même le fait de cacher la list et réinverser flêche
     */
    $('#navList').css('display', 'none');
    $('.navListArrowUp').css('display', 'none');
    $(".elementNavListPhone").click(function () {
        $('#navList').slideToggle('slow');
        $(this).children('div').children('div').children('.navListArrowDown').slideToggle(0);
        $(this).children('div').children('div').children('.navListArrowUp').slideToggle(0);
    });

    /*NAV DES COMPETENCE
      Je commence par mettre les bonnes couleur et bordure de l'élément de nav selectionné par défaut, puis cacher les skill info et dev
      Je lance une fonction lorsque je clique sur un élément poosèdant l'id elementNavSkill
      Je commence par cacher toute les bordure des nav a mettre la couleur non selectionner sur les boutton de la nav puis cacher toute les skill, puis je color et affiche les bordure du bouton sur le quel j'ai cliqué
      Si j'ai cliquer sur l'élément possèdant la class focusSkillDev j'affiche les skill dev. Si j'ai cliquer sur l'élément possèdant la class focusSkillInfo j'affiche les skill info. Si j'ai cliquer sur l'élément possèdant la class focusSkillGen j'affiche les skill Gen.
     */
    $('.defaultNavSkillSelect').css('background-color', '#18181b');
    $('.defaultNavSkillSelect').children('.bordeNavSkill').show();
    $('.defaultNavSkillSelect').children('.navSkillArrowDown').slideUp(0);
    $('.defaultNavSkillSelect').children('.navSkillArrowUp').slideDown(0);
    $('#skillInfo, #skillDev').hide();
    $('.elementNavSkill').click(function () {
        $('.bordeNavSkill').hide();
        $('.elementNavSkill').css('background-color', '#2f2f2f');
        $('.panelSkill').hide();
        $(this).css('background-color', '#18181b');
        $(this).children('.bordeNavSkill').show();
        if ($(this).hasClass('focusSkillDev')){
            $('#skillDev').show();
        } else if ($(this).hasClass('focusSkillInfo')){
            $('#skillInfo').show();
        } else if ($(this).hasClass('focusSkillGen')){
            $('#skillGen').show();
        }
    });
    $('.elementNavSkillPhone').click(function () {
        $(this).children('.navSkillArrowUp').slideToggle(0);
        $(this).children('.navSkillArrowDown').slideToggle(0);
        if ($(this).children('.navSkillArrowUp').css('display') == "none") {
            $(this).css('background-color', '#2f2f2f');
        } else {
            $(this).css('background-color', '#18181b');
        }
        if ($(this).hasClass('focusSkillDev')) {
            $('#skillDev').slideToggle('slow');
        } else if ($(this).hasClass('focusSkillInfo')) {
            $('#skillInfo').slideToggle('slow');
        } else if ($(this).hasClass('focusSkillGen')) {
            $('#skillGen').slideToggle('slow');
        }
    });


    /*COULEUR DES PROGRESSION DES COMPETENCE
     * Je commence par parcourrire toute mes élément possèdant la class progressBar
     * Si son attribut lvlSkill est suppérieur ou égale à 1 je color son enfant lvlOne
     * Si son attribut lvlSkill est suppérieur ou égale à 2 je color son enfant lvlTwo, etc jusqu'à 5
    */
    $('.progressBar').each(function () {
        if ($(this).attr('lvlSkill') >= 1) {
            $(this).children('.lvlOne').css('background-color', '#008B7B');
        }
        if ($(this).attr('lvlSkill') >= 2) {
            $(this).children('.lvlTwo').css('background-color', '#008B7B');
        }
        if ($(this).attr('lvlSkill') >= 3) {
            $(this).children('.lvlThree').css('background-color', '#008B7B');
        }
        if ($(this).attr('lvlSkill') >= 4) {
            $(this).children('.lvlFour').css('background-color', '#008B7B');
        }
        if ($(this).attr('lvlSkill') >= 5) {
            $(this).children('.lvlFive').css('background-color', '#008B7B');
        }
    });

    /*EN SAVOIR PLUS ET MOINS DES COMPETENCE 
     Je commence par déclarer ma variable qui vas stoker le dernier skill cliquer de base null, la variable qui vas stocker l'élément qui vas subir une action aprés une pause, et je cache les descriptiondes skill aisni que le boutton fermer (la desc)
     Si je clique sur un boutton En savoir +
     On ferme toute les descriptions rapidement, en enlève tout les fermer et on affiche tout les en savoir +, et on ajoute les class col-sm-6 col-lg-3 a tout les cardSkill pour être sur qui on toute la même taille (tout ça pour n'ouvrir qu'une seule desc enmême temps)
     On stoke le 4ieme parent de l'élément dont nous avons cliquer dansla variable lastElementSkillClic, et on stoke l'élément qui vas faire une pause
     D'abord on passe notre skill card col-2 pour ça on enlève les class col-sm-6 col-lg-3 puis aprés 400ms on ouvre doucement la description du skill, pour finir on enlève son boutton en savoire + et on affiche son boutton fermer
     Si on clique sur le boutton fermer
     On stoke l'élément qui vas faire une pause
     D'abord on ferme la description, puis apres 400ms on ajoute les class col-md-6 col-lg-3 et pour finir on cache le bouton fermer et on affiche le boutton en savoir +
     */
    var lastElementSkillClic = null;
    var elementSkillTimeOut;
    $('.learnLessSkill').hide();
    $('.descSkill').hide();
    $(".learnMoreSkill").click(function () {
        $('.descSkill').slideUp("fast");
        $('.learnLessSkill').hide();
        $('.learnMoreSkill').show();
        $('.skillCard').addClass('col-sm-6 col-lg-3');
        lastElementSkillClic = $(this).parent().parent().parent().parent();
        elementSkillTimeOut = $(this).siblings('.descSkill');
        lastElementSkillClic.removeClass('col-sm-6 col-lg-3');
        setTimeout(function () {
            elementSkillTimeOut.slideDown("slow");
        }, 400);
        $(this).hide();
        $(this).siblings('.learnLessSkill').show();
    });
    $(".learnLessSkill").click(function () {
        elementSkillTimeOut = $(this).parent().parent().parent().parent();
        $(this).siblings('.descSkill').slideUp();
        setTimeout(function () {
            elementSkillTimeOut.addClass('col-sm-6 col-lg-3');
        }, 400);
        $(this).hide();
        $(this).siblings('.learnMoreSkill').show();
    });

    //v, e, r, t
    var greenArray = [
        '#00FF00',
        '#00FC00',
        '#00F900',
        '#00F600',
        '#00F300',
        '#00CF00',
        '#00CC00',
        '#00C900',
        '#00C600',
        '#00C300',
        '#00C000',
        '#009F00',
        '#009C00',
        '#009900',
        '#009600',
        '#009300',
        '#009000',
        '#004F00',
        '#004C00',
        '#004900',
        '#004600',
        '#004300',
        '#004000'
    ];
    var konamiCode = [86, 69, 82, 84],
    elementkonamiCode = 0;
    $(window).keydown(function (keyPressUser) {
        if (keyPressUser.keyCode == konamiCode[elementkonamiCode++]) {
            if (elementkonamiCode == konamiCode.length) {
                $('*').each(function () {
                    var salut = Math.floor(Math.random() * Math.floor(20));
                    $(this).css('transition-duration', '5s');
                    $(this).css('background-color', greenArray[salut]);
                    $(this).css('color', greenArray[salut]);
                    $(this).css('border-color', greenArray[salut]);
                    console.log($(this));
                });
                elementkonamiCode = 0;
            }
        }
        else {
            elementkonamiCode = 0;
        }
    });

    $('.js-scrollTo').on('click', function () { // Au clic sur un élément
        var page = $(this).attr('href'); // Page cible
        var speed = 750; // Durée de l'animation (en ms)
        $('html, body').animate({ scrollTop: $(page).offset().top }, speed); // Go
        return false;
    });

});
