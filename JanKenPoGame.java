import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Random;
import javax.swing.ImageIcon;

public class JanKenPoGame extends JFrame implements ActionListener {

    private JLabel computadoraLabel;
    private JLabel resultadoLabel;
    private JButton piedraButton;
    private JButton papelButton;
    private JButton tijeraButton;
    private ImageIcon piedraImagen;
    private ImageIcon papelImagen;
    private ImageIcon tijeraImagen;
    private ImageIcon preguntaImagen; // Imagen para la elección inicial de la computadora
    private Random random;

    public JanKenPoGame() {
        // Cargar las imágenes
        try {
            piedraImagen = new ImageIcon(getClass().getResource("/img/piedra.png"));
            papelImagen = new ImageIcon(getClass().getResource("/img/papel.png"));
            tijeraImagen = new ImageIcon(getClass().getResource("/img/tijera.png"));
            preguntaImagen = new ImageIcon(getClass().getResource("/img/interrogacion.png"));
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, "Error al cargar las imágenes: " + e.getMessage(), "Error", JOptionPane.ERROR_MESSAGE);
            System.exit(1);
        }

        random = new Random();

        // Configurar la ventana
        setTitle("¡JanKenPo!");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new FlowLayout());

        // Crear los componentes
        computadoraLabel = new JLabel("Computadora:");
        computadoraLabel.setIcon(preguntaImagen); // Establecer la imagen inicial de la computadora
        resultadoLabel = new JLabel("¡Elige tu jugada!");

        piedraButton = new JButton(piedraImagen);
        papelButton = new JButton(papelImagen);
        tijeraButton = new JButton(tijeraImagen);

        // Configurar los botones
        piedraButton.setActionCommand("PIEDRA");
        papelButton.setActionCommand("PAPEL");
        tijeraButton.setActionCommand("TIJERA");

        piedraButton.addActionListener(this);
        papelButton.addActionListener(this);
        tijeraButton.addActionListener(this);

        // Añadir los componentes a la ventana
        add(computadoraLabel);
        add(resultadoLabel);
        add(piedraButton);
        add(papelButton);
        add(tijeraButton);

        pack();
        setLocationRelativeTo(null);
        setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        String jugadorEleccionStr = e.getActionCommand();
        Jugada jugadorEleccion = Jugada.valueOf(jugadorEleccionStr);
        Jugada computadoraEleccion = obtenerJugadaComputadora();

        // Actualizar la imagen de la computadora
        if (computadoraEleccion == Jugada.PIEDRA) {
            computadoraLabel.setIcon(piedraImagen);
        } else if (computadoraEleccion == Jugada.PAPEL) {
            computadoraLabel.setIcon(papelImagen);
        } else {
            computadoraLabel.setIcon(tijeraImagen);
        }

        // Determinar el ganador y mostrar el resultado
        String resultado = Jugada.determinarGanador(jugadorEleccion, computadoraEleccion);
        resultadoLabel.setText("Tú: " + jugadorEleccion + ", Computadora: " + computadoraEleccion + ". ¡" + resultado + "!");
    }

    private Jugada obtenerJugadaComputadora() {
        int eleccion = random.nextInt(3); // 0 para PIEDRA, 1 para PAPEL, 2 para TIJERA
        switch (eleccion) {
            case 0:
                return Jugada.PIEDRA;
            case 1:
                return Jugada.PAPEL;
            default:
                return Jugada.TIJERA;
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new JanKenPoGame());
    }
}