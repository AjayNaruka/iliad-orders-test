<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\User;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

class ApiController extends AbstractController
{
    #[Route('/api/v1/store-product', methods: ['POST'])]
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

    #[Route('/api/v1/list-products', methods: ['GET'])]
    public function listProducts(ProductRepository $pr): Response
    {
        $products = $pr->findAll();
        $mappedProducts = array_map(function($product){
            return [
                "id" => $product->getId(),
                "name" => $product->getName(),
                "description" => $product->getDescription(),
                "price" => $product->getPrice(),
                "image" => $product->getImage(),
            ];
        }, $products);

        return $this->json($mappedProducts);
    }


    #[Route('/api/v1/index-product', methods: ['GET'])]
    public function indexProduct(ProductRepository $pr): Response
    {
        $product = $pr
            ->findOneBy([
                "name" => "Keyboard"
            ]);

        return $this->json("PRICE: " . $product->getPrice());
    }

    #[Route('/api/v1/create-user', methods: ['POST'])]
    public function createUser(UserPasswordHasherInterface $hasher, EntityManagerInterface $em): Response
    {
        $user = new User();
        $user->setEmail("fapuasn@gmail.com");
        $user->setRoles(['ROLE_USER']);
        $user->setPassword($hasher->hashPassword($user, 'password123'));

        $em->persist($user);
        $em->flush();

        return new Response('User created');
    }
}
