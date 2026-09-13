import { Form, Head } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="fullbright-auth-form flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    className="border-[#dedbd6] bg-white text-[#151515] placeholder:text-[#9a9791] focus-visible:border-[#D70808] focus-visible:ring-[#D70808]/15"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    className="border-[#dedbd6] bg-white text-[#151515] placeholder:text-[#9a9791] focus-visible:border-[#D70808] focus-visible:ring-[#D70808]/15"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                    />
                                    <Label htmlFor="remember">Ingat saya</Label>
                                </div>
                                {canResetPassword && (
                                    <TextLink
                                        href={request()}
                                        className="text-sm font-medium text-[#D70808] hover:text-[#b90707]"
                                        tabIndex={5}
                                    >
                                        Lupa password?
                                    </TextLink>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full bg-[#D70808] hover:bg-[#b90707]"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                Masuk ke Dashboard
                            </Button>
                            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                                <ShieldCheck className="size-3.5 text-[#D70808]" />
                                Akses khusus administrator Fullbright
                            </div>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Masuk ke Dashboard',
    description: 'Gunakan akun administrator untuk melihat performa CTWA.',
};
