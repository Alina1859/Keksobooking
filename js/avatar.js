const FILE_TYPES = ['svg', 'gif', 'jpg', 'jpeg', 'png'];
const avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const avatarField = document.querySelector('.ad-form__field');
const offerFileChooser = document.querySelector('.ad-form__upload input[type=file]');
const offerPreview = document.querySelector('.ad-form__photo img');
const offerField = document.querySelector('.ad-form__upload');

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const onFileInputChange = (fileChooser, preview) => {
  const file = fileChooser.files[0];

  if (file && isValidType(file)) {
    preview.src = URL.createObjectURL(file);
  }
};

avatarField.addEventListener('change', () => onFileInputChange(avatarFileChooser, avatarPreview));

offerField.addEventListener('change', () => onFileInputChange(offerFileChooser, offerPreview));

