import * as Yup from 'yup';

export default function configurarsValidaciones() {
  Yup.addMethod(Yup.string, 'primeraLetraMayuscula', function () {
    return this.test('primera-letra-mayuscula', 'tienes que ser mayúscula', function (value) {
      if (value && value.length > 0) {
        const primeraletra = value.substring(0, 1);
        return primeraletra === primeraletra.toUpperCase();
      }
      return true;
    });
  });
}
