import { extend } from "vee-validate";
import { required, email, min, confirmed } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "해당 필드는 필수입니다.",
});

extend("min", {
  ...min,
  message: "최소 {length} 글자를 입력해주세요",
});

extend("confirmed", {
  ...confirmed,
  errors: "비밀번호가 일치하지 않습니다.",
});

extend("email", {
  ...email,
  message: "유효한 이메일 양식이 아닙니다.",
});
