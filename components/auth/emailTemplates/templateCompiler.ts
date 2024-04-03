import { activationTemplate } from "./activation";
import { resetPasswordTemplate } from "./resetPassword";
import Handlebars from "handlebars";

export function compileActivationTemplate(name: string, url: string) {
    const template = Handlebars.compile(activationTemplate);
    const htmlBody = template({ name, url });
    return htmlBody;
}

export function compileResetPasswordTemplate(name: string, reset_link: string) {
    const template = Handlebars.compile(resetPasswordTemplate);
    const htmlBody = template({ name, reset_link });
    return htmlBody;
}
