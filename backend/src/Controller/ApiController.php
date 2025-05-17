<?php

namespace App\Controller;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ApiController extends AbstractController
{
    #[Route('/v1/store-product', methods: ['POST'])]
    public function storeProduct(EntityManagerInterface $entityManager): Response
    {
        $data = array();
        try {
            $newProduct = new Product();
            $newProduct->setName('Keyboard');
            $newProduct->setPrice(10.5);

            $entityManager->persist($newProduct);
            $entityManager->flush();

        } catch (\Exception $e) {
            $data["error"] = $e->getMessage();
            return $this->json($data);
        }
        

        return $this->json("FINE STORE PRODUCT");
    }
}