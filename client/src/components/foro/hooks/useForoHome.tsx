import { getPosts } from "../../../../helpers/foro/getPosts";
import { postPost } from "../../../../helpers/foro/postPost";
import { likePosts } from "../../../../helpers/foro/likePosts";
import { useEffect, useState } from "react";

import { putPost } from "../../../../helpers/foro/putPost";
import { deletePosts } from "../../../../helpers/foro/deletePosts";
import Swal from "sweetalert2";
//------- USUARIO HELPER ----------
import { useAuth0 } from "@auth0/auth0-react";
//---------------

export function useForoHome() {
  const [allPost, setAllPost] = useState([]);
  const [addLike, setAddLike] = useState<boolean>(false);
  const [addPost, setAddPost] = useState<boolean>(false);
  const [addEdit, setAddEdit] = useState<boolean>(false);

  const { user } = useAuth0();

  const [form, setForm] = useState({
    email: user?.email,
    title: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    getPosts()
      .then(res => res.json())
      .then(res => setAllPost(res));
  }, [addLike, addPost, addEdit]);

  const likeHandler = (post: string) => {
    likePosts({
      email: user?.email,
      post,
    }).then(() => {
      setAddLike(!addLike);
    });
  };

  const handlerSubmit = () => {
    if (user?.email) {
      setForm({
        ...form,
        email: user?.email,
      });
      postPost(form).then(() => {
        setAddPost(!addPost);
        setForm({
          ...form,
          title: "",
          content: "",
          image: "",
        });
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El email no es valido!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  const handlerLike = () => {
    likePosts({
      id: "63c6f11bf46e034dfcbeeae6",
      post: "63d1f32e866456f173d36227",
    })
      .then(res => res.json())
      .then(res => alert(res));
  };

  const handlerChangePost = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user?.email) {
      setForm({
        ...form,
        email: user?.email,
        [e.target.name]: e.target.value,
      });
    }
  };

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postPost(form).then(response =>
      getPosts()
        .then(res => res.json())
        .then(res => setAllPost(res))
    );

    setForm({
      ...form,
      title: "",
      content: "",
      image: "",
    });
  };

  const onDeletePost = (id: string) => {
    deletePosts({
      email: form.email,
      idPost: id,
    }).then(res =>
      getPosts()
        .then(res => res.json())
        .then(res => setAllPost(res))
    );
  };

  const handlerSubmitEdit = async (content: string, id: string) => {
    await putPost({ content }, id).then(res => {
      setAddEdit(!addEdit);
    });
  };

  return [
    form,
    allPost,
    {
      likeHandler,
      handlerSubmit,
      handlerLike,
      handlerChangePost,
      submitPost,
      onDeletePost,
      setAllPost,
      handlerSubmitEdit,
    },
  ];
}
