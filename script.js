document.getElementById('calculateTotal').addEventListener('click', function () {
    const products = document.querySelectorAll('.product');
    let total = 0;
  
    products.forEach(product => {
      const priceText = product.querySelector('.price').textContent;
      const price = parseFloat(priceText.replace('Preço: €', ''));
      const quantity = parseInt(product.querySelector('input[name="quantity"]').value);
  
      total += price * quantity;
    });
  
    document.getElementById('total').textContent = `Total: €${total.toFixed(2)}`;
  });
  
  document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Coletando os dados
    const customerName = document.getElementById('customerName').value;
    const products = document.querySelectorAll('.product');
    let data = [];
  
    products.forEach((product, index) => {
      const productName = product.querySelector('p').textContent;
      const size = product.querySelector('select').value;
      const quantity = parseInt(product.querySelector('input[name="quantity"]').value);
      const priceText = product.querySelector('.price').textContent;
      const price = parseFloat(priceText.replace('Preço: €', ''));
      const subtotal = price * quantity;
  
      data.push({
        Nome: customerName,
        Produto: productName,
        Tamanho: size,
        Quantidade: quantity,
        Preço: `€${price.toFixed(2)}`,
        Subtotal: `€${subtotal.toFixed(2)}`
      });
    });
  
    // Adicionando os dados ao Excel
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pedido");
  
    // Gerando o arquivo Excel
    XLSX.writeFile(workbook, `Pedido_${customerName}.xlsx`);
  
    alert('Compra finalizada e arquivo Excel gerado!');
  });
  