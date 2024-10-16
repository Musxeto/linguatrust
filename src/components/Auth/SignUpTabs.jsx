import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import this
import { addDoc, collection } from "firebase/firestore";
import CreatableSelect from "react-select/creatable";
import { useNavigate } from "react-router-dom";

const SignUpTabs = () => {
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [languages, setLanguages] = useState([]);
  const navigate = useNavigate()
  const handleSignUpClient = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        name,
        email,
        role: "client",
      });
      toast.success("Client account created!");
      navigate("/")
    } catch (error) {
      toast.error("Sign Up failed: " + error.message);
      console.log(error);
    }
  };

  const handleSignUpTranslator = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        name,
        email,
        languages,
        role: "translator",
      });
      toast.success("Translator account created!");
      navigate("/")
    } catch (error) {
      toast.error("Sign Up failed: " + error.message);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-300 h-screen">
      {role === null ? (
        <div className="bg-white w-2/4 p-10 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Welcome Visitor</h2>
          <p className="mb-3">Please specify what you need. I am a:</p>
          <div className="flex">
            <button
              onClick={() => setRole("client")}
              className="flex-1 bg-pink-500 hover:bg-pink-400 text-white p-2 rounded mr-2"
            >
              Client
            </button>
            <button
              onClick={() => setRole("translator")}
              className="flex-1 bg-black hover:bg-gray-800 text-white p-2 rounded"
            >
              Translator
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={
            role === "client" ? handleSignUpClient : handleSignUpTranslator
          }
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Welcome {role.charAt(0).toUpperCase() + role.slice(1)}
          </h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mb-4 p-2 border rounded w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4 p-2 border rounded w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-4 p-2 border rounded w-full"
          />
          {role === "translator" && (
            <CreatableSelect
              isMulti
              options={languageOptions}
              onChange={(selectedOptions) =>
                setLanguages(selectedOptions.map(option => option.value))
              }
              placeholder="Select Languages"
              className="mb-4"
            />
          )}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white p-2 rounded"
          >
            Sign Up
          </button>
          <p className="mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-pink-500">
              Log In
            </a>
          </p>
        </form>
      )}
    </div>
  );
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

export default SignUpTabs;