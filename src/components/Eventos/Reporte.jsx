import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { BarChart3 } from "lucide-react";

export default function Reporte({ evento }) {
  if (!evento) return null;

  const generarPDF = () => {
    try {
      const doc = new jsPDF();
      const azul = "#0077B6";
      const celeste = "#4da6ff";
      const grisFondo = "#f4f6fa";
      const fecha = new Date().toLocaleDateString("es-AR");

      // Fondo general
      doc.setFillColor(grisFondo);
      doc.rect(0, 0, 210, 297, "F");

      // Encabezado
      doc.setFillColor(azul);
      doc.rect(0, 0, 210, 25, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor("#FFFFFF");
      doc.text("Reporte del Evento", 20, 16);

      // Línea divisoria
      doc.setDrawColor(celeste);
      doc.setLineWidth(0.5);
      doc.line(20, 30, 190, 30);

      // 🔹 Cálculo recaudación (moverlo arriba)
      const totalRecaudado =
        evento.entradas?.reduce(
          (acc, e) => acc + e.precio * (e.cantidad - e.stock),
          0
        ) || 0;

      // Texto informativo
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor("#000000");
      doc.text(`Generado el: ${fecha}`, 20, 40);
      doc.text(`Evento: ${evento.nombre}`, 20, 50);
      doc.text(`Capacidad total: ${evento.capacidad}`, 20, 60);
      doc.text(
        `Entradas vendidas: ${evento.capacidad - evento.stockEntradas}`,
        20,
        70
      );
      doc.text(`Entradas restantes: ${evento.stockEntradas}`, 20, 80);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(azul);
      doc.text(
        `Recaudacion total: $${totalRecaudado.toLocaleString("es-AR")}`,
        20,
        95
      );

      // Tabla con entradas
      if (evento.entradas?.length) {
        autoTable(doc, {
          startY: 110,
          head: [["Tipo", "Precio", "Vendidas", "Stock restante"]],
          body: evento.entradas.map((e) => [
            e.tipo,
            `$${e.precio}`,
            e.cantidad - e.stock,
            e.stock,
          ]),
          headStyles: {
            fillColor: [0, 119, 182],
            textColor: 255,
            halign: "center",
            fontStyle: "bold",
          },
          styles: {
            fontSize: 11,
            textColor: "#000000",
            halign: "center",
          },
          alternateRowStyles: { fillColor: [244, 246, 250] },
        });
      }

      // Pie de página
      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.setTextColor("#666666");
      doc.text(
        "Tickealo - Plataforma de gestion de eventos | tickealo.com",
        20,
        285
      );

      const nombreLimpio = evento.nombre
        .replace(/\s+/g, "_")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      doc.save(`reporte_${nombreLimpio}.pdf`);
    } catch (error) {
      console.error("❌ Error generando PDF:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={generarPDF}
        className="flex items-center gap-2 text-sm text-[#4da6ff] hover:text-white transition-colors"
      >
        <BarChart3 size={16} />
        Descargar reporte
      </button>
    </div>
  );
}
