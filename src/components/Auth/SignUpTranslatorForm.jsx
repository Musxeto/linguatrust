import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import CreatableSelect from "react-select/creatable"; 
import { ToastContainer, toast } from "react-toastify";

const SignUpTranslatorForm = ({ setShowSignUpModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [languages, setLanguages] = useState([]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        name,
        email,
        languages: languages.map(lang => lang.value), 
        role: "translator",
      });
      toast.success("Account created!");
      setShowSignUpModal(false);
    } catch (error) {
      toast.error("Sign Up failed: " + error.message);
    }
  };

  const languageOptions = [
    { label: "English", value: "English" },
    { label: "Urdu", value: "Urdu" },
    { label: "Spanish", value: "Spanish" },
    { label: "Mandarin Chinese", value: "Mandarin Chinese" },
    { label: "Hindi", value: "Hindi" },
    { label: "French", value: "French" },
    { label: "Arabic", value: "Arabic" },
    { label: "Bengali", value: "Bengali" },
    { label: "Portuguese", value: "Portuguese" },
    { label: "Russian", value: "Russian" },
    { label: "Japanese", value: "Japanese" },
    { label: "Punjabi", value: "Punjabi" },
    { label: "German", value: "German" },
    { label: "Korean", value: "Korean" },
    { label: "Vietnamese", value: "Vietnamese" },
    { label: "Italian", value: "Italian" },
    { label: "Turkish", value: "Turkish" },
    { label: "Persian", value: "Persian" },
    { label: "Polish", value: "Polish" },
    { label: "Dutch", value: "Dutch" },
    { label: "Swedish", value: "Swedish" },
    { label: "Greek", value: "Greek" },
    { label: "Czech", value: "Czech" },
    { label: "Hungarian", value: "Hungarian" },
    { label: "Thai", value: "Thai" },
    { label: "Hebrew", value: "Hebrew" },
    { label: "Romanian", value: "Romanian" },
    { label: "Indonesian", value: "Indonesian" },
    { label: "Ukrainian", value: "Ukrainian" },
    { label: "Malay", value: "Malay" },
    { label: "Finnish", value: "Finnish" },
    { label: "Norwegian", value: "Norwegian" },
    { label: "Danish", value: "Danish" },
    { label: "Serbian", value: "Serbian" },
    { label: "Croatian", value: "Croatian" },
    { label: "Bulgarian", value: "Bulgarian" },
    { label: "Slovak", value: "Slovak" },
    { label: "Slovenian", value: "Slovenian" },
    { label: "Lithuanian", value: "Lithuanian" },
    { label: "Latvian", value: "Latvian" },
    { label: "Estonian", value: "Estonian" },
    { label: "Icelandic", value: "Icelandic" },
    { label: "Maltese", value: "Maltese" },
    { label: "Welsh", value: "Welsh" },
    { label: "Irish", value: "Irish" },
    { label: "Scottish Gaelic", value: "Scottish Gaelic" },
    { label: "Afrikaans", value: "Afrikaans" },
    { label: "Swahili", value: "Swahili" },
    { label: "Zulu", value: "Zulu" },
    { label: "Xhosa", value: "Xhosa" },
  ];

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
      <CreatableSelect 
        isMulti 
        options={languageOptions} 
        onChange={setLanguages} 
        placeholder="Select Languages"
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

export default SignUpTranslatorForm;
