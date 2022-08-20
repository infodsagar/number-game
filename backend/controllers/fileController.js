//Get all products
const getFiles = async (req, res) => {
  const user_id = req.user._id;

  const products = await Product.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(products);
};

//Get a single product
const getFile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product' });
  }

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ error: 'No product found' });
  }

  res.status(200).json(product);
};

//Add new product
const createFile = async (req, res) => {
  const { title, desc, qty, price } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!desc) {
    emptyFields.push('desc');
  }
  if (!qty) {
    emptyFields.push('qty');
  }
  if (!price) {
    emptyFields.push('price');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please enter all details', emptyFields });
  }

  try {
    const user_id = req.user._id;
    const product = await Product.create({ title, desc, qty, price, user_id });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//Delete product
const deleteFile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product' });
  }

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    res.status(404).json({ error: 'No such product' });
  }

  res.status(200).json(product);
};

//Patch qty
const updateFile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product' });
  }

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!product) {
    res.status(404).json({ error: 'No such product' });
  }

  res.status(200).json(product);
};

module.exports = {
  createFile,
  getFiles,
  getFile,
  deleteFile,
  updateFile,
};
