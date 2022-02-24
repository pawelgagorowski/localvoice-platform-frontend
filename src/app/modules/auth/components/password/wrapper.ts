import { AxiosError } from 'axios';
import Vue, { CreateElement, VNode } from 'vue';
import { mapGetters } from 'vuex';
import { FormGroup, matchWith, required } from '~app/shared/form';
import { authGetters } from '../../store';
import { passwordService } from './service';

export interface PasswordFormData {
  login: string;
  current: string;
  password: string;
  confirm: string;
}

export type VPasswordFormWrapper = Vue & {
  onSubmit(e?: Event): void;
  reset(e?: Event): void;
};

export default Vue.extend({
  name: 'password-form-wrapper',
  data() {
    const form = new FormGroup<PasswordFormData>({
      login: {
        default: '',
        validators: [required],
      },
      current: {
        default: '',
        validators: [required],
      },
      password: {
        default: '',
        validators: [required],
      },
      confirm: {
        default: '',
        validators: [required, matchWith('password')],
      },
    });

    return {
      form,
    };
  },
  computed: {
    ...mapGetters({
      user: authGetters.getUser,
    }),
  },
  watch: {
    'form.data': {
      deep: true,
      handler() {
        if (this.form.validated) {
          this.form.validate();
        }
      },
    },
  },
  created(): void {
    this.form.data.login = this.user.login;
  },
  methods: {
    onSubmit(e?: Event) {
      e?.preventDefault();

      if (!this.form.validate()) {
        return;
      }

      passwordService
        .change(this.form.data.current, this.form.data.password)
        .then(() => {
          this.$toast.success('Password changed');
          this.$emit('success');
          this.reset();
        })
        .catch((err: AxiosError) => {
          if (err.response!.status !== 400) {
            throw err;
          }

          // TODO(API): better error response
          if (err.response!.data.message.includes('Old password')) {
            this.form.setCustomError('current', this.$t('Invalid password') as string);
            return;
          }
        });
    },

    reset(e?: Event) {
      e?.preventDefault();

      this.form.reset({
        current: undefined,
        password: undefined,
        confirm: undefined,
      });
    },
  },

  render(h: CreateElement): VNode {
    return h(
      'form',
      {
        on: {
          submit: this.onSubmit,
          reset: this.reset,
        },
      },
      this.$scopedSlots.default!({
        form: this.form,
      }),
    );
  },
});
