(function() {
    var contactModule = angular.module('contact', ['ui.router']);

    // contact routing config
    contactModule.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('contacts', {
                url: "/contacts",
                templateUrl: "app/contact/contact-list.tpl.html"
            });
    });

    contactModule.controller('ContactController', function() {
        var controller = this;

        controller.contacts = [
            {name: 'Werbth', phone: '12345678', email: 'werbth@gmail.com'},
            {name: 'Teste', phone: '11111111', email: 'teste@teste.com'},
            {name: 'Contac 3', phone: '33333333', email: 'contact@teste.com'}
        ];
    });
})();
