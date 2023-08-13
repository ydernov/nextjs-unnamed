const Create = () => (
  <form method="post" action="/api/image" encType="multipart/form-data">
    <input name="logo" type="file" />

    <button type="submit">submit</button>
  </form>
);

export default Create;
