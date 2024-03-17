const messagesContent = $('.msgs-content');
const messageInput = $('.msg-input');
const messageSubmit = $('.msg-submit');
const avatarImage = '../img/vilma.jpg';
const fakeMessages = [
    'Buenos días, bienvenido a la Pastelería Vilma. ¿En qué puedo ayudarte hoy?',
    '¡Hola, Diana! Me alegra escuchar eso. ¿Cómo puedo ayudarte?',
    '¡Qué maravilloso escuchar eso, Diana! Estamos encantados de haber contribuido a hacer de ese día un momento memorable para tu madre. ¿Hubo algo en particular que te gustó de nuestra tarta?',
    'Nos esforzamos mucho para asegurarnos de que nuestros clientes estén satisfechos en cada paso del proceso. Agradecemos tus amables palabras y nos alegra saber que cumplimos con tus expectativas. ¿Hay algo más en lo que podamos ayudarte?',
    'Nos alegra mucho escuchar eso, Diana. Estaremos encantados de atenderte nuevamente cuando lo necesites. ¡Gracias por elegirnos y por tomarte el tiempo para compartir tu experiencia con nosotros!',
    ' ¡Hasta luego, Diana! Que tengas un excelente día.',
    ':)'
];

let minutes = 0;

$(window).on('load', function () {
    messagesContent.mCustomScrollbar();
    setTimeout(fakeMessage, 100);
});

function updateScrollbar() {
    messagesContent.mCustomScrollbar('update').mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        timeout: 0
    });
};

function addTimestamp() {
    const date = new Date();
    const minutesNow = date.getMinutes();

    if (minutes !== minutesNow) {
        minutes = minutesNow;
        const timeStamp = $('<div class="timestamp"></div>').text(`${date.getHours()}:${minutes}`);
        $('.msg:last').append(timeStamp);
    };
};

function addMessageToPage(msg, isPersonal = false) {
    const message = $('<div class="msg"></div>').text(msg);
    if (isPersonal) {
        message.addClass('msg-personal');
    } else {
        const figure = $('<figure class="avatar"></figure>');
        const image = $('<img>').attr('src', avatarImage);
        figure.append(image);
        message.addClass('new').prepend(figure);
    };
    $('.mCSB_container').append(message);
    addTimestamp();
    updateScrollbar();
};

function insertMessage() {
    const messageText = messageInput.val().trim();
    if (messageText === '') {
        return false;
    };
    addMessageToPage(messageText, true);
    messageInput.val(null);
    setTimeout(fakeMessage, 1000 + (Math.random() * 20) * 100);
};

messageInput.on('keydown', function (e) {
    if (e.which === 13) {
        insertMessage();
        return false;
    };
});

messageSubmit.on('click', insertMessage);

function fakeMessage() {
    if (messageInput.val() !== '') {
        return false;
    };

    const loadingMessage = $('<div class="msg loading new"></div>');
    const figure = $('<figure class="avatar"></figure>');
    const image = $('<img>').attr('src', avatarImage);
    figure.append(image);
    loadingMessage.append(figure).append($('<span></span>'));
    $('.mCSB_container').append(loadingMessage);
    updateScrollbar();

    setTimeout(function () {
        loadingMessage.remove();
        addMessageToPage(fakeMessages.shift());
    }, 1000 + (Math.random() * 20) * 100);
}