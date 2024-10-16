import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

const SignUpClientForm = ({ setShowSignUpModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        name,
        email,
        role: "client",
      });
      toast.success("Account created!");
      setShowSignUpModal(false); // Ensure this is defined in your props or state
    } catch (error) {
      // Log error details for debugging
      console.error("Sign Up error:", error);
      toast.error("Sign Up failed: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
        className="p-2 border border-gray-300 rounded"
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
        className="p-2 border border-gray-300 rounded"
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
        className="p-2 border border-gray-300 rounded"
      />
      <button 
        type="submit" 
        className="bg-customPink text-white p-2 rounded hover:bg-pink-600"
      >
        Sign Up
      </button>
      <p className="text-center mt-4">
        Already have an account? <button onClick={() => setShowSignUpModal(false)}>Sign In</button>
      </p>
      <ToastContainer />
    </form>
  );
};

export default SignUpClientForm;