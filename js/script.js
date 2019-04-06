/* eslint-disable camelcase */
$(document).ready(function() {
        // eslint-disable-next-line no-undef
        particlesJS.load('particles-js', './assets/particles.json', function() {
                // eslint-disable-next-line no-console
                console.log('callback - particles.js config loaded');
        });
        const $projects = $('.projects');
        const $contact = $('.contact');
        const $btn_left = $('.left_btn');
        const $btn_right = $('.right_btn');
        const $section = $('.some_text');
        $btn_left.click(function() {
                if ($section.hasClass('some_text_push_to_left')) {
                        $contact.removeClass('contact-open');
                        $section.removeClass('some_text_push_to_left');
                } else {
                        $projects.addClass('project-open');
                        $section.addClass('some_text_push_to_right');
                }
        });
        $btn_right.click(function() {
                if ($section.hasClass('some_text_push_to_right')) {
                        $projects.removeClass('project-open');
                        $section.removeClass('some_text_push_to_right');
                } else {
                        $contact.addClass('contact-open');
                        $section.addClass('some_text_push_to_left');
                }
        });
        // function validate(){
        $(document).on('click', '#btnSubmit', function(e) {
                e.preventDefault();
                const subject = $('#tbSubject').val();
                const email = $('#tbEmail').val();
                const message = $('#taContent').val();
                const errors = [];

                // eslint-disable-next-line camelcase
                const check_subject = /^[A-Za-z0-9 ]{3,20}$/;
                // eslint-disable-next-line camelcase
                const check_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

                if (!check_subject.test(subject)) {
                        errors[errors.length] = 'You valid Subject (3-20).';
                }
                if (!check_email.test(email)) {
                        errors[errors.length] = 'You must enter a valid email address.';
                }
                if (message == '') {
                        errors[errors.length] = 'You must enter a valid Message (cannot be empty).';
                }
                if (errors.length > 0) {
                        // eslint-disable-next-line no-use-before-define
                        reportErrors(errors);
                        return false;
                }
                $.ajax({
                        type: 'POST',
                        url: 'contact.php/send_email',
                        data: {
                                Subject: subject,
                                Mail: email,
                                Message: message,
                        },
                        dataType: 'text',
                        success(res) {
                                $('.tbSubject').val('');
                                $('.tbEmail').val('');
                                $('.taContent').val('');
                                alert(res);
                        },
                });
                return true;
        });

        function reportErrors(errors) {
                let msg = 'Please Enter Valide Data...\n';
                // eslint-disable-next-line no-plusplus
                for (let i = 0; i < errors.length; i++) {
                        const numError = i + 1;
                        msg += `\n${numError}. ${errors[i]}`;
                }
                alert(msg);
        }

        // enable vibration support

        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

        if (navigator.vibrate) {
                $('.left_btn').click(function(e) {
                        e.preventDefault();
                        navigator.vibrate(25);
                });
                $('.right_btn').click(function(e) {
                        e.preventDefault();
                        navigator.vibrate(25);
                });
                $('.tbSubject').focus(function(e) {
                        e.preventDefault();
                        navigator.vibrate(25);
                });
                $('.tbEmail').focus(function(e) {
                        e.preventDefault();
                        navigator.vibrate(25);
                });
                $('.taContent').focus(function(e) {
                        e.preventDefault();
                        navigator.vibrate(25);
                });
        }
        // mouse move
        const windowWidth = $(window).width();
        $('#particles-js').mousemove(function(event) {
                const moveX = ($(window).width() / 2 - event.pageX) * 0.05;
                const moveY = ($(window).height() / 2 - event.pageY) * 0.05;
                $('.random').css('margin-left', `${moveX}px`);
                $('.random').css('margin-top', `${moveY}px`);
        });
        // text animation
        const $randomnbr = $('.nbr');
        const $timer = 30;
        let $it;
        let $data = 0;
        let index;
        let change;
        const letters = ['d', 'u', 's', 'a', 'n', ' ', 'r', 'a', 's', 'i', 'c'];

        $randomnbr.each(function() {
                change = Math.round(Math.random() * 100);
                $(this).attr('data-change', change);
        });
        function random() {
                return Math.round(Math.random() * 9);
        }
        function select() {
                return Math.round(Math.random() * $randomnbr.length + 1);
        }
        function value() {
                $(`.nbr:nth-child(${select()})`).html(`${random()}`);
                $(`.nbr:nth-child(${select()})`).attr('data-number', $data);
                // eslint-disable-next-line no-plusplus
                $data++;

                $randomnbr.each(function() {
                        if (parseInt($(this).attr('data-number')) > parseInt($(this).attr('data-change'))) {
                                index = $('.ltr').index(this);
                                $(this).html(letters[index]);
                                $(this).removeClass('nbr');
                        }
                });
        }
        // eslint-disable-next-line prefer-const
        $it = setInterval(value, $timer);
});
