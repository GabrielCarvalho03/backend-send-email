"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/email/emailOptions.ts
var emailOptions_exports = {};
__export(emailOptions_exports, {
  emailOptions: () => emailOptions
});
module.exports = __toCommonJS(emailOptions_exports);
var emailOptions = (props) => {
  return {
    from: "bookease5@gmail.com",
    to: props.email,
    subject: "Reserva foi confirmada!",
    html: `
          <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
              <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #333;">Bem-vindo ao BookEase!</h2>
                <p>Ol\xE1, ${props.name}!</p>
                <p>Estamos muito felizes em t\xEA-lo conosco. Obrigado por se juntar \xE0 nossa comunidade!</p>
                <p>Com o BookEase, voc\xEA pode facilmente reservar suas viagens e estadias com apenas alguns cliques.</p>
                <p>Se voc\xEA tiver alguma d\xFAvida ou precisar de assist\xEAncia, n\xE3o hesite em nos contatar.</p>
                <br></br>
                <p>Seu c\xF3digo de estadia \xE9 :</p>
                 <br></br>
                    <p style="font-weigth:600 ; font-size:22px; text-align:center" >74367834</p>
                    <br></br>
                <p>Atenciosamente,<br>Equipe BookEase</p>
                <hr style="border: none; border-top: 1px solid #ddd;">
                <p style="font-size: 0.9em; color: #555;">Este \xE9 um email autom\xE1tico, por favor, n\xE3o responda.</p>
              </div>
            </body>
          </html>
        `
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  emailOptions
});
