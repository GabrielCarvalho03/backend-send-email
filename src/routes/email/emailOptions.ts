type EmailOptions = {
  name: string;
  email: string;
};

export const emailOptions = (props: EmailOptions) => {
  return {
    from: "bookease5@gmail.com",
    to: props.email,
    subject: "Reserva foi confirmada!",
    html: `
          <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
              <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #333;">Bem-vindo ao BookEase!</h2>
                <p>Olá, ${props.name}!</p>
                <p>Estamos muito felizes em tê-lo conosco. Obrigado por se juntar à nossa comunidade!</p>
                <p>Com o BookEase, você pode facilmente reservar suas viagens e estadias com apenas alguns cliques.</p>
                <p>Se você tiver alguma dúvida ou precisar de assistência, não hesite em nos contatar.</p>
                <br></br>
                <p>Seu código de estadia é :</p>
                 <br></br>
                    <p style="font-weigth:600 ; font-size:22px; text-align:center" >74367834</p>
                    <br></br>
                <p>Atenciosamente,<br>Equipe BookEase</p>
                <hr style="border: none; border-top: 1px solid #ddd;">
                <p style="font-size: 0.9em; color: #555;">Este é um email automático, por favor, não responda.</p>
              </div>
            </body>
          </html>
        `,
  };
};
