import AuthForm from "../../components/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center p-4">
      <AuthForm initialState="login" />
    </div>
  );
}